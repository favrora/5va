import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');
const layout = await read('src/layouts/Layout.astro');
const stylesheetPaths = [...layout.matchAll(/import\s+['"]([^'"]+\.css)['"]/g)].map(
  (match) => new URL(match[1], new URL('src/layouts/Layout.astro', root)),
);
const stylesheets = await Promise.all(stylesheetPaths.map((path) => readFile(path, 'utf8')));

// Parse project CSS blocks, keeping conditional rules out of default color tests.
// This is deliberately a declaration reader, not a browser layout simulation.
function rulesFrom(css, context = []) {
  const rules = [];
  css = css.replace(/\/\*[\s\S]*?\*\//g, '');
  let start = 0;
  while (start < css.length) {
    const open = css.indexOf('{', start);
    if (open < 0) break;
    const selector = css.slice(start, open).trim();
    let depth = 1;
    let quote = '';
    let end = open + 1;
    for (; end < css.length && depth; end++) {
      const char = css[end];
      if (quote) {
        if (char === '\\') end++;
        else if (char === quote) quote = '';
      } else if (char === '"' || char === "'") quote = char;
      else if (char === '{') depth++;
      else if (char === '}') depth--;
    }
    assert.equal(depth, 0, 'CSS blocks must be balanced');
    const body = css.slice(open + 1, end - 1);
    if (/^@(media|supports|container|layer)\b/.test(selector)) {
      rules.push(...rulesFrom(body, [...context, selector]));
    } else if (!/^@(?:-\w+-)?keyframes\b/.test(selector)) {
      const declarations = new Map(
        body.split(';').flatMap((part) => {
          const colon = part.indexOf(':');
          return colon < 0 ? [] : [[part.slice(0, colon).trim(), part.slice(colon + 1).trim()]];
        }),
      );
      rules.push({ selector, declarations, context });
    }
    start = end;
  }
  return rules;
}

const loadedRules = stylesheets.flatMap((css) => rulesFrom(css));
function declaration(selector, property) {
  let value;
  for (const rule of loadedRules) {
    if (
      !rule.context.length &&
      rule.selector.split(',').some((item) => item.trim() === selector) &&
      rule.declarations.has(property)
    )
      value = rule.declarations.get(property);
  }
  assert.ok(value, 'Missing default CSS declaration: ' + selector + ' / ' + property);
  return value;
}
const tokens = new Map(
  loadedRules
    .filter((rule) => !rule.context.length && rule.selector === ':root')
    .flatMap((rule) => [...rule.declarations].filter(([name]) => name.startsWith('--'))),
);
function color(value) {
  value = value.replace(/var\((--[\w-]+)\)/g, (_, name) => {
    assert.ok(tokens.has(name), 'Unknown CSS color token ' + name);
    return tokens.get(name);
  });
  const match = value.match(/#[\da-f]{6}\b|#[\da-f]{3}\b/i);
  assert.ok(match, 'Expected an opaque project color in: ' + value);
  let hex = match[0].slice(1);
  if (hex.length === 3) hex = [...hex].map((digit) => digit + digit).join('');
  return hex;
}
function luminance(hex) {
  const channels = [0, 2, 4]
    .map((offset) => parseInt(hex.slice(offset, offset + 2), 16) / 255)
    .map((channel) => (channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4));
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}
function contrast(first, second) {
  const [low, high] = [luminance(first), luminance(second)].sort((a, b) => a - b);
  return (high + 0.05) / (low + 0.05);
}

test('muted body and disclosure text meets 4.5:1 on the actual light section backgrounds', () => {
  const foreground = color(tokens.get('--muted'));
  const backgrounds = [
    ['paper', declaration('body', 'background')],
    ['cream/sidebar', declaration('.info-panel', 'background')],
    ['about', declaration('.about-band', 'background')],
    ['reviews', declaration('.reviews-section', 'background')],
  ];
  for (const [name, background] of backgrounds) {
    const ratio = contrast(foreground, color(background));
    assert.ok(ratio >= 4.5, name + ': muted contrast is ' + ratio.toFixed(4) + ':1; needs 4.5:1');
  }
});

test('the dark hero and service brief keep readable text contrast', () => {
  const backgrounds = [
    [
      '.home-hero',
      [
        '.home-hero',
        '.home-hero-description',
        '.hero-call-note',
        '.hero-fee-note',
        '.proof-detail',
      ],
    ],
    ['.repair-hero', ['.repair-hero', '.repair-hero-lead', '.repair-call-note']],
    ['.service-brief', ['.service-brief', '.service-brief li', '.brief-note']],
    ['.phone-contact-panel', ['.phone-contact-panel', '.contact-text-link']],
  ];
  for (const [backgroundSelector, foregroundSelectors] of backgrounds) {
    const background = color(declaration(backgroundSelector, 'background'));
    for (const selector of foregroundSelectors) {
      const ratio = contrast(color(declaration(selector, 'color')), background);
      assert.ok(ratio >= 4.5, `${selector}: contrast ${ratio.toFixed(3)}:1 needs 4.5:1`);
    }
  }
});

test('the visible focus ring contrasts at least 3:1 on light, yellow, and dark sections', () => {
  for (const selector of ['a:focus-visible', 'button:focus-visible', 'input:focus-visible']) {
    const outline = declaration(selector, 'outline');
    const shadow = declaration(selector, 'box-shadow');
    assert.match(outline, /[1-9][\d.]*px\s+solid/, selector + ': visible outline required');
    assert.match(shadow, /[1-9][\d.]*px/, selector + ': visible second ring required');
    const ringColors = [color(outline), color(shadow)];
    assert.ok(contrast(...ringColors) >= 3, selector + ': the two focus colors must contrast');
    for (const background of [
      declaration('body', 'background'),
      declaration('.cta-section', 'background'),
      declaration('.site-footer', 'background'),
    ]) {
      const ratio = Math.max(...ringColors.map((ring) => contrast(ring, color(background))));
      assert.ok(ratio >= 3, selector + ': neither ring contrasts with ' + background);
    }
  }
});

async function cssFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map(async (entry) => {
        const path = new URL(entry.name + (entry.isDirectory() ? '/' : ''), directory);
        return entry.isDirectory() ? cssFiles(path) : entry.name.endsWith('.css') ? [path] : [];
      }),
    )
  ).flat();
}
const projectCSS = await Promise.all(
  (await cssFiles(new URL('src/', root))).map(async (path) => ({
    path,
    rules: rulesFrom(await readFile(path, 'utf8')),
  })),
);
function commaValues(value) {
  return value.split(/,(?![^()]*\))/).map((item) => item.trim());
}
function seconds(value) {
  const match = value.match(/^(-?[\d.]+)(ms|s)$/);
  assert.ok(match, 'Animation timing must be an explicit duration: ' + value);
  return Number(match[1]) / (match[2] === 'ms' ? 1000 : 1);
}
test('automatic CSS animation is finite and finishes within five seconds', () => {
  for (const { path, rules } of projectCSS) {
    for (const { selector, declarations } of rules) {
      const motion = [...declarations].filter(([name]) => /^animation(?:-|$)/.test(name));
      for (const [, value] of motion) {
        assert.doesNotMatch(
          value,
          /\binfinite\b/i,
          path.pathname + ' ' + selector + ': endless animation',
        );
      }
      const animation = declarations.get('animation');
      if (!animation || /^none(?:\s|$)/.test(animation)) continue;
      for (const [index, part] of commaValues(animation).entries()) {
        const timing = [...part.matchAll(/(-?[\d.]+(?:ms|s))\b/g)].map((match) =>
          seconds(match[1]),
        );
        let duration = timing[0] ?? 0;
        let delay = timing[1] ?? 0;
        let iterations = Number(
          part.split(/\s+/).find((token) => /^(?:\d+(?:\.\d*)?|\.\d+)$/.test(token)) ?? 1,
        );
        if (declarations.has('animation-duration'))
          duration = seconds(
            commaValues(declarations.get('animation-duration'))[
              index % commaValues(declarations.get('animation-duration')).length
            ],
          );
        if (declarations.has('animation-delay'))
          delay = seconds(
            commaValues(declarations.get('animation-delay'))[
              index % commaValues(declarations.get('animation-delay')).length
            ],
          );
        if (declarations.has('animation-iteration-count'))
          iterations = Number(
            commaValues(declarations.get('animation-iteration-count'))[
              index % commaValues(declarations.get('animation-iteration-count')).length
            ],
          );
        const finish = Math.max(0, delay) + duration * iterations;
        assert.ok(
          Number.isFinite(finish) && finish <= 5,
          selector + ': automatic animation finishes after ' + finish + 's; needs <=5s',
        );
      }
    }
  }
});

const header = await read('src/components/Header.astro');
const journal = await read('src/pages/blog/index.astro');
function openingTag(source, id) {
  const tag = [...source.matchAll(/<(?:button|div|nav|fieldset)\b[^>]*>/g)]
    .map((match) => match[0])
    .find((value) => value.includes('id="' + id + '"'));
  assert.ok(tag, 'Missing control #' + id);
  return tag;
}
function initiallyHidden(source, id) {
  assert.match(
    openingTag(source, id),
    /(?:^|\s)hidden(?=\s|\/?>(?:$))/,
    '#' + id + ' must stay hidden until its JavaScript enhancement is available',
  );
}
function clientScript(source) {
  return [...source.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)]
    .map((match) => match[1])
    .join('\n');
}

function runClient(source) {
  let activeElement;
  class Element {
    constructor(id = '') {
      this.id = id;
      this.hidden = true;
      this.disabled = true;
      this.handlers = new Map();
      this.children = [];
      this.dataset = {};
      this.options = [];
    }
    addEventListener(name, handler) {
      this.handlers.set(name, handler);
    }
    setAttribute(name, value) {
      this[name] = value;
    }
    append(node) {
      this.children.push(node);
    }
    focus() {
      activeElement = this;
    }
    getClientRects() {
      return this.hidden ? [] : [{}];
    }
    querySelectorAll() {
      return this.controls ?? [];
    }
    showModal() {
      this.open = true;
      this.controls?.find((control) => control.getClientRects().length)?.focus();
    }
    close() {
      this.open = false;
      this.handlers.get('close')?.();
    }
  }
  const ids = [
    'menu-open',
    'menu-close',
    'mobile-menu',
    'load-map',
    'map-container',
    'service-filters',
    'journal-filters',
    'guide-count',
  ];
  const elements = new Map(ids.map((id) => ['#' + id, new Element(id)]));
  const dialogControls = [
    new Element('hidden-before'),
    new Element('drawer-brand'),
    elements.get('#menu-close'),
    new Element('drawer-services'),
    new Element('drawer-call'),
    new Element('hidden-after'),
  ];
  for (const control of dialogControls.slice(1, -1)) {
    control.hidden = false;
    control.disabled = false;
  }
  elements.get('#mobile-menu').controls = dialogControls;
  elements.get('#mobile-menu').open = false;
  const serviceButton = new Element();
  serviceButton.dataset.filter = 'all';
  const journalButton = new Element();
  journalButton.dataset.guideFilter = 'all';
  const document = {
    get activeElement() {
      return activeElement;
    },
    querySelector: (selector) => elements.get(selector) ?? null,
    querySelectorAll: (selector) =>
      ({ '[data-filter]': [serviceButton], '[data-guide-filter]': [journalButton] })[selector] ??
      [],
    createElement: () => new Element(),
  };
  const location = { search: '', pathname: '/contact/', origin: 'http://localhost:4321' };
  const context = vm.createContext({
    document,
    HTMLElement: Element,
    URLSearchParams,
    location,
    exports: {},
    window: { matchMedia: () => ({ matches: false, addEventListener() {} }) },
  });
  const compiled = ts.transpileModule(clientScript(source), {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
  });
  vm.runInContext(compiled.outputText, context);
  return {
    elements,
    dialogControls,
    serviceButton,
    journalButton,
    get activeElement() {
      return activeElement;
    },
  };
}

test('JavaScript-only controls are hidden without scripts and usable after their real scripts initialize', () => {
  const controls = [
    [header, 'menu-open', 'click'],
    [journal, 'journal-filters'],
  ];
  for (const [source, id, action] of controls) {
    initiallyHidden(source, id);
    const result = runClient(source);
    assert.equal(result.elements.get('#' + id).hidden, false, '#' + id + ' was never enabled');
    if (action)
      assert.ok(result.elements.get('#' + id).handlers.has(action), '#' + id + ' has no handler');
    if (id === 'service-filters') assert.ok(result.serviceButton.handlers.has('click'));
    if (id === 'journal-filters') assert.ok(result.journalButton.handlers.has('click'));
  }
});

test('the real drawer script wraps Tab at both visible ends without trapping other keys or closed dialogs', () => {
  const result = runClient(header);
  const dialog = result.elements.get('#mobile-menu');
  const visible = result.dialogControls.filter((control) => control.getClientRects().length);
  const first = visible[0];
  const middle = visible[1];
  const last = visible[visible.length - 1];
  const keydown = dialog.handlers.get('keydown');
  assert.ok(keydown, 'Drawer needs the keyboard boundary handler');
  result.elements.get('#menu-open').handlers.get('click')();
  assert.equal(dialog.open, true);
  assert.equal(result.activeElement, first, 'Opening starts at the first visible drawer link');

  function press(key = 'Tab', shiftKey = false) {
    let prevented = false;
    keydown({
      key,
      shiftKey,
      preventDefault() {
        prevented = true;
      },
    });
    return prevented;
  }

  assert.equal(press('Tab', true), true, 'Shift+Tab at the first link must wrap');
  assert.equal(result.activeElement, last, 'Backward wrap lands on the last visible action');
  assert.equal(press(), true, 'Tab at the last action must wrap');
  assert.equal(result.activeElement, first, 'Forward wrap lands on the first visible link');

  for (const [control, key, shifted] of [
    [middle, 'Tab', false],
    [middle, 'Tab', true],
    [first, 'Tab', false],
    [last, 'Tab', true],
    [first, 'Escape', true],
    [last, 'Enter', false],
  ]) {
    control.focus();
    assert.equal(press(key, shifted), false, 'Native navigation must handle non-boundary keys');
    assert.equal(result.activeElement, control, 'Non-boundary key must not move focus in script');
  }

  dialog.open = false;
  first.focus();
  assert.equal(press('Tab', true), false, 'A closed drawer must not intercept Shift+Tab');
  assert.equal(result.activeElement, first);
  last.focus();
  assert.equal(press(), false, 'A closed drawer must not intercept Tab');
  assert.equal(result.activeElement, last);
});
