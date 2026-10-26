import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const source = await readFile(new URL('../src/scripts/mobile-header.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
}).outputText;

function fixture({ mobile = true, y = 0, height = 6000 } = {}) {
  class Events {
    handlers = new Map();
    options = new Map();
    addEventListener(name, handler, options) {
      if (!this.handlers.has(name)) this.handlers.set(name, new Set());
      this.handlers.get(name).add(handler);
      this.options.set(name, options);
    }
    removeEventListener(name, handler) {
      this.handlers.get(name)?.delete(handler);
    }
    fire(name) {
      for (const handler of this.handlers.get(name) ?? []) handler();
    }
  }
  const header = Object.assign(new Events(), {
    dataset: {},
    offsetHeight: 70,
    visibleFocus: false,
    querySelector: () => (header.visibleFocus ? {} : null),
  });
  const menu = { open: false };
  const media = Object.assign(new Events(), { matches: mobile });
  let nextFrame = 0;
  const frames = new Map();
  const browser = Object.assign(new Events(), {
    scrollY: y,
    innerHeight: 844,
    matchMedia: () => media,
    requestAnimationFrame(callback) {
      frames.set(++nextFrame, callback);
      return nextFrame;
    },
    cancelAnimationFrame(id) {
      frames.delete(id);
    },
  });
  const doc = { documentElement: { scrollHeight: height } };
  let observer;
  class MutationObserver {
    constructor(callback) {
      this.callback = callback;
      this.disconnected = false;
      observer = this;
    }
    observe(element, options) {
      assert.equal(element, menu);
      assert.deepEqual(Array.from(options.attributeFilter), ['open']);
    }
    disconnect() {
      this.disconnected = true;
    }
  }
  const context = vm.createContext({ exports: {}, MutationObserver });
  vm.runInContext(compiled, context);
  const cleanup = context.exports.installMobileHeader(header, menu, browser, doc);
  const flush = () => {
    const pending = [...frames.values()];
    frames.clear();
    pending.forEach((callback) => callback());
  };
  return {
    header,
    menu,
    media,
    browser,
    frames,
    observer,
    cleanup,
    flush,
    get hidden() {
      return header.dataset.scrollHidden === 'true';
    },
    scroll(y) {
      browser.scrollY = y;
      browser.fire('scroll');
      flush();
    },
    toggleMenu(open) {
      menu.open = open;
      observer.callback();
    },
  };
}

test('mobile reading hides after deliberate downward travel and reveals sooner on upward travel', () => {
  const f = fixture();
  f.scroll(80);
  assert.equal(f.hidden, false, 'the header stays visible near the document top');
  f.scroll(110);
  assert.equal(f.hidden, true);
  f.scroll(108);
  f.scroll(106);
  assert.equal(f.hidden, true, 'a tiny reverse finger movement must not flicker the header');
  f.scroll(102);
  assert.equal(f.hidden, false, 'eight upward pixels reveal the navigation');
  f.scroll(108);
  assert.equal(f.hidden, false);
  f.scroll(116);
  assert.equal(f.hidden, true, 'fourteen downward pixels hide it again');
  f.scroll(0);
  assert.equal(f.hidden, false);
});

test('elastic overscroll at either document edge cannot create a false direction reversal', () => {
  const f = fixture();
  f.scroll(-40);
  assert.equal(f.hidden, false);
  f.scroll(5000);
  assert.equal(f.hidden, true);
  f.scroll(5300);
  f.scroll(5400);
  f.scroll(5300);
  assert.equal(f.hidden, true, 'bottom rubber band is clamped to the same document coordinate');
  f.scroll(5145);
  assert.equal(f.hidden, false, 'a real upward movement out of the bottom edge reveals it');
});

test('desktop remains visible and breakpoint changes reset accumulated mobile travel', () => {
  const f = fixture({ mobile: false });
  f.scroll(500);
  assert.equal(f.hidden, false);
  f.media.matches = true;
  f.media.fire('change');
  f.scroll(510);
  assert.equal(f.hidden, false, 'resize must not reuse previous direction travel');
  f.scroll(515);
  assert.equal(f.hidden, true);
  f.media.matches = false;
  f.media.fire('change');
  assert.equal(f.hidden, false);
  f.scroll(2000);
  assert.equal(f.hidden, false);
});

test('opening or closing the drawer reveals navigation without changing the page scroll coordinate', () => {
  const f = fixture();
  f.scroll(700);
  assert.equal(f.hidden, true);
  f.toggleMenu(true);
  assert.equal(f.hidden, false);
  assert.equal(f.browser.scrollY, 700);
  f.scroll(900);
  assert.equal(f.hidden, false, 'an open drawer pins its background header');
  f.toggleMenu(false);
  assert.equal(f.hidden, false);
  assert.equal(f.browser.scrollY, 900);
  f.scroll(910);
  assert.equal(f.hidden, false, 'closing resets the scroll baseline');
});

test('keyboard focus, restored pages, anchors and resizing reveal the header', () => {
  const f = fixture();
  f.scroll(500);
  assert.equal(f.hidden, true);
  f.header.visibleFocus = true;
  f.header.fire('focusin');
  assert.equal(f.hidden, false);
  f.scroll(700);
  assert.equal(f.hidden, false, 'a visibly keyboard-focused control must remain on screen');
  f.header.visibleFocus = false;
  for (const name of ['resize', 'pageshow', 'hashchange']) {
    f.scroll(f.browser.scrollY + 50);
    assert.equal(f.hidden, true);
    f.browser.fire(name);
    assert.equal(f.hidden, false, name);
  }
});

test('passive scroll handling coalesces frames and cleanup removes its listeners and pending work', () => {
  const f = fixture();
  assert.equal(f.browser.options.get('scroll').passive, true);
  f.browser.scrollY = 500;
  f.browser.fire('scroll');
  f.browser.fire('scroll');
  f.browser.fire('scroll');
  assert.equal(f.frames.size, 1);
  f.flush();
  assert.equal(f.hidden, true);
  f.browser.fire('scroll');
  f.cleanup();
  assert.equal(f.frames.size, 0);
  assert.equal(f.hidden, false);
  assert.equal(f.observer.disconnected, true);
  f.scroll(1500);
  assert.equal(f.hidden, false);
});
