import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const layout = await readFile(new URL('../src/layouts/Layout.astro', import.meta.url), 'utf8');
const client = [...layout.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)]
  .map((match) => match[1])
  .find((script) => /document\.addEventListener\s*\(\s*['"]click['"]/.test(script));
assert.ok(client, 'The shared layout must initialize contact delegation');
const source = ts.createSourceFile('layout-client.ts', client, ts.ScriptTarget.Latest, true);
const contactListener = source.statements.find((statement) => {
  const call = ts.isExpressionStatement(statement) && statement.expression;
  return (
    call &&
    ts.isCallExpression(call) &&
    call.expression.getText(source) === 'document.addEventListener' &&
    ts.isStringLiteral(call.arguments[0]) &&
    call.arguments[0].text === 'click'
  );
});
assert.ok(contactListener, 'The real document click listener must be present');
const compiled = ts.transpileModule(contactListener.getText(source), {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
}).outputText;

// A parent-aware element tree plus native capture/target/bubble ordering, not a browser layout.
class Element {
  constructor(tag, attributes = {}, parent = null) {
    this.tag = tag;
    this.attributes = attributes;
    this.parent = parent;
    this.dataset = Object.fromEntries(
      Object.entries(attributes)
        .filter(([name]) => name.startsWith('data-'))
        .map(([name, value]) => [
          name.slice(5).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()),
          value,
        ]),
    );
  }
  get protocol() {
    return new URL(this.attributes.href || '', 'https://5varepair.com').protocol;
  }
  matches(selector) {
    if (selector.startsWith('.'))
      return (this.attributes.class || '').split(/\s+/).includes(selector.slice(1));
    const match = selector.match(/^([a-z][\w-]*)?(?:\[([\w-]+)(?:\^="([^"]*)")?\])?$/);
    if (!match) throw new Error('Unsupported fixture selector: ' + selector);
    const [, tag, attribute, prefix] = match;
    return (
      (!tag || this.tag === tag) &&
      (!attribute ||
        (Object.hasOwn(this.attributes, attribute) &&
          (prefix === undefined || this.attributes[attribute].startsWith(prefix))))
    );
  }
  closest(selector) {
    for (let node = this; node; node = node.parent)
      if (selector.split(',').some((part) => node.matches(part.trim()))) return node;
    return null;
  }
}

function fixture() {
  const listeners = [];
  const emitted = [];
  vm.runInNewContext(compiled, {
    Element,
    location: { pathname: '/services/washer-repair/' },
    CustomEvent: class {
      constructor(type, options) {
        this.type = type;
        this.detail = options.detail;
      }
    },
    document: {
      addEventListener(type, callback, options) {
        listeners.push({
          type,
          callback,
          capture: typeof options === 'boolean' ? options : options?.capture === true,
        });
      },
    },
    window: {
      dispatchEvent(event) {
        emitted.push({ type: event.type, detail: JSON.parse(JSON.stringify(event.detail)) });
      },
    },
  });
  return {
    emitted,
    click(target, atTarget = () => {}) {
      const event = {
        target,
        defaultPrevented: false,
        stopped: false,
        preventDefault() {
          this.defaultPrevented = true;
        },
        stopPropagation() {
          this.stopped = true;
        },
      };
      for (const listener of listeners.filter((item) => item.type === 'click' && item.capture))
        listener.callback(event);
      atTarget(event);
      if (!event.stopped)
        for (const listener of listeners.filter((item) => item.type === 'click' && !item.capture))
          listener.callback(event);
      return event;
    },
  };
}

test('the real shared click handler measures nested phone and SMS icons exactly once', () => {
  for (const [href, event, region, attributes, placement] of [
    ['tel:+12677048588', 'phone_click', 'header', {}, 'header'],
    [
      'sms:+12677048588',
      'sms_click',
      'section',
      { 'data-tracking-region': 'home-hero' },
      'home-hero',
    ],
    ['tel:+18005550123', 'phone_click', 'footer', {}, 'footer'],
  ]) {
    const f = fixture();
    const container = new Element(region, attributes);
    const link = new Element('a', { href }, container);
    const path = new Element('path', {}, new Element('svg', {}, link));
    const click = f.click(path);
    assert.deepEqual(f.emitted, [
      {
        type: '5va:conversion',
        detail: { event, path: '/services/washer-repair/', placement },
      },
    ]);
    assert.equal(
      click.defaultPrevented,
      false,
      'measurement must preserve native phone/SMS actions',
    );
    assert.equal(click.stopped, false, 'measurement must not block other handlers');
  }
});

test('explicit button placement overrides its containing tracking region', () => {
  const f = fixture();
  const section = new Element('section', { 'data-tracking-region': 'home-hero' });
  const link = new Element(
    'a',
    { href: 'sms:+12677048588', 'data-placement': 'hero-text' },
    section,
  );
  f.click(new Element('span', {}, link));
  assert.equal(f.emitted.length, 1);
  assert.equal(f.emitted[0].detail.placement, 'hero-text');
});

test('ordinary navigation and targets outside the element tree do not create contact intents', () => {
  const f = fixture();
  for (const target of [
    new Element('a', { href: '/services/' }),
    new Element('a', { href: 'https://www.google.com/maps?cid=12282828888363558368' }),
    new Element('button'),
    { nodeType: 3, nodeValue: 'Text only' },
    null,
  ]) {
    const click = f.click(target);
    assert.equal(click.defaultPrevented, false);
  }
  assert.deepEqual(f.emitted, []);
});

test('a target stopping propagation cannot suppress the already captured contact intent', () => {
  const f = fixture();
  const link = new Element('a', { href: 'tel:+12677048588' }, new Element('header'));
  const icon = new Element('path', {}, new Element('svg', {}, link));
  let targetRan = false;
  const click = f.click(icon, (event) => {
    targetRan = true;
    event.stopPropagation();
  });
  assert.equal(targetRan, true, 'the native target handler must still run');
  assert.equal(click.defaultPrevented, false);
  assert.equal(f.emitted.length, 1);
  assert.equal(f.emitted[0].detail.event, 'phone_click');
  assert.equal(f.emitted[0].detail.placement, 'header');
});
