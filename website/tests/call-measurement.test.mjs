import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  initCallMeasurement,
  ANALYTICS_ID,
  CONSENT_KEY,
  CONSENT_SCOPE,
  CONSENT_MAX_AGE,
} from '../src/scripts/call-measurement.ts';

const PHONE = '+1 (267) 704-8588';
const HREF = 'tel:+12677048588';
const NOW = Date.UTC(2026, 9, 26);
const saved = (choice, savedAt = NOW, version = 2, scope = CONSENT_SCOPE) =>
  JSON.stringify({ version, scope, choice, savedAt });

function fixture({
  search = '',
  pathname = '/',
  referrer = '',
  stored,
  legacyStored,
  hostname = '5varepair.com',
  protocol = 'https:',
  port = '',
  noCard = false,
  blockedStorage = false,
  blockedWrites = false,
  blockedRemoval = false,
  deniedDuringProbe = false,
  blockedCookies = false,
} = {}) {
  let activeElement;
  let reloads = 0;
  let writesBlocked = blockedWrites;
  let removalBlocked = blockedRemoval;
  const cookies = [];
  const scripts = [];
  const storage = new Map(stored === undefined ? [] : [[CONSENT_KEY, stored]]);
  if (legacyStored !== undefined) storage.set('5va-call-measurement-v1', legacyStored);
  class Text {
    constructor(value) {
      this.nodeType = 3;
      this.nodeValue = value;
      this.childNodes = [];
    }
    get textContent() {
      return this.nodeValue;
    }
  }
  class Element {
    constructor(tag = 'div', children = []) {
      this.nodeType = 1;
      this.childNodes = children;
      this.dataset = {};
      this.hidden = true;
      this.attributes = new Map();
      this.handlers = new Map();
      this.tagName = tag;
    }
    get textContent() {
      return this.childNodes.map((node) => node.textContent).join('');
    }
    set textContent(value) {
      this.childNodes = [new Text(value ?? '')];
    }
    setAttribute(key, value) {
      this.attributes.set(key, value);
    }
    getAttribute(key) {
      return this.attributes.get(key) ?? null;
    }
    addEventListener(key, handler) {
      this.handlers.set(key, [...(this.handlers.get(key) || []), handler]);
    }
    fire(key, event = {}) {
      for (const handler of this.handlers.get(key) || []) handler(event);
    }
    focus() {
      activeElement = this;
    }
    contains(node) {
      return this === node || this.childNodes.some((child) => child.contains?.(node));
    }
    remove() {
      this.removed = true;
    }
  }
  const allow = new Element('button');
  const decline = new Element('button');
  const message = new Element('p', [new Text('Optional Google ad-call measurement')]);
  const opener = new Element('button');
  const card = new Element('section', [allow, decline, message]);
  card.querySelector = (selector) =>
    ({
      '[data-call-allow]': allow,
      '[data-call-decline]': decline,
      '[data-call-message]': message,
    })[selector] || null;
  const icon = new Element('svg');
  const numberText = new Text(PHONE);
  const strong = new Element('strong', [numberText]);
  const numberLink = new Element('a', [icon, new Text('Call '), strong]);
  numberLink.setAttribute('aria-label', `Call ${PHONE}`);
  const genericLink = new Element('a', [new Text('Call for free')]);
  const secondNumber = new Element('a', [new Text(PHONE)]);
  const callLinks = [numberLink, genericLink, secondNumber];
  for (const link of callLinks) link.setAttribute('href', HREF);
  const sms = new Element('a', [new Text(`Text ${PHONE}`)]);
  sms.setAttribute('href', 'sms:+12677048588');
  const page = {
    referrer,
    get activeElement() {
      return activeElement;
    },
    get cookie() {
      if (blockedCookies) throw new Error('Cookies blocked');
      return '_ga=example; _ga_TEST=example; _gcl_aw=example; gwcc=example; unrelated=keep';
    },
    set cookie(value) {
      cookies.push(value);
    },
    head: {
      appendChild(script) {
        scripts.push(script);
        return script;
      },
    },
    createElement: (tag) => new Element(tag),
    querySelector: (selector) => (selector === '#call-privacy' && !noCard ? card : null),
    querySelectorAll: (selector) =>
      selector === '[data-call-measurement-open]'
        ? [opener]
        : selector === `a[href="${HREF}"]`
          ? callLinks
          : [],
  };
  const browser = new Element('window');
  browser.location = {
    protocol,
    hostname,
    origin: new URL(`${protocol}//${hostname}${port ? `:${port}` : ''}`).origin,
    search,
    pathname,
    reload() {
      reloads++;
    },
  };
  browser.localStorage = {
    getItem(key) {
      if (blockedStorage) throw new Error('Storage blocked');
      return storage.get(key) ?? null;
    },
    setItem(key, value) {
      if (blockedStorage || writesBlocked) throw new Error('Storage blocked');
      storage.set(key, value);
      if (deniedDuringProbe && key === `${CONSENT_KEY}-write-test`)
        storage.set(CONSENT_KEY, saved('denied'));
    },
    removeItem(key) {
      if (blockedStorage || removalBlocked) throw new Error('Storage removal blocked');
      storage.delete(key);
    },
  };
  const init = () => initCallMeasurement({ window: browser, document: page, now: () => NOW });
  init();
  const commands = () => (browser.dataLayer || []).map((entry) => [...entry]);
  const phoneConfig = () =>
    commands().find(([kind, destination]) => kind === 'config' && destination.includes('/'))?.[2];
  return {
    browser,
    page,
    card,
    allow,
    decline,
    opener,
    numberLink,
    numberText,
    genericLink,
    secondNumber,
    sms,
    icon,
    strong,
    callLinks,
    scripts,
    storage,
    cookies,
    init,
    commands,
    phoneConfig,
    analyticsConfig: () =>
      commands().find(
        ([kind, destination]) => kind === 'config' && destination === ANALYTICS_ID,
      )?.[2],
    contact(detail) {
      browser.fire('5va:conversion', { detail });
    },
    events: () => commands().filter(([kind]) => kind === 'event'),
    blockWrites({ removal = false } = {}) {
      writesBlocked = true;
      removalBlocked = removal;
    },
    get reloads() {
      return reloads;
    },
    get activeElement() {
      return activeElement;
    },
  };
}

test('all new visitors see a choice without loading Google or saving click identifiers', () => {
  for (const search of [
    '',
    '?utm_source=google',
    '?gclid=',
    '?gclid=example',
    '?gbraid=example',
    '?wbraid=example',
  ]) {
    const f = fixture({ search });
    assert.equal(f.card.hidden, false, search);
    assert.equal(f.opener.hidden, false);
    assert.equal(f.activeElement, undefined, 'automatic prompt must not steal focus');
    assert.equal(f.scripts.length, 0);
    assert.equal(f.browser.dataLayer, undefined);
    assert.equal(f.storage.size, 0, 'do not save ad click parameters');
    f.contact({ event: 'phone_click', placement: 'home-hero' });
    f.contact({ event: 'sms_click', placement: 'footer' });
    assert.equal(f.events().length, 0);
    f.decline.fire('click');
    assert.equal(f.scripts.length, 0);
    assert.equal(f.browser.dataLayer, undefined);
    assert.equal(f.reloads, 0);
    assert.equal(f.numberLink.getAttribute('href'), HREF);
  }
});

test('manual opt-in configures both destinations with one loader and stores only scoped consent', () => {
  const f = fixture({ search: '?gclid=never-store-this-click-id' });
  f.opener.fire('click');
  assert.equal(f.card.hidden, false);
  assert.equal(f.scripts.length, 0);
  f.allow.fire('click');
  assert.equal(f.scripts.length, 1);
  assert.equal(f.scripts[0].src, 'https://www.googletagmanager.com/gtag/js?id=AW-18107060066');
  assert.equal(f.scripts[0].async, true);
  assert.equal(f.card.hidden, true);
  assert.equal(f.activeElement, f.opener);
  assert.deepEqual(JSON.parse(f.storage.get(CONSENT_KEY)), {
    version: 2,
    scope: CONSENT_SCOPE,
    choice: 'allowed',
    savedAt: NOW,
  });
  assert.doesNotMatch(JSON.stringify([...f.storage]), /never-store-this-click-id|gclid/);
  const commands = f.commands();
  assert.deepEqual(commands[0], [
    'consent',
    'default',
    {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
    },
  ]);
  assert.deepEqual(commands[1], [
    'consent',
    'update',
    {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'denied',
      analytics_storage: 'granted',
    },
  ]);
  assert.deepEqual(commands[2], ['set', 'allow_ad_personalization_signals', false]);
  assert.deepEqual(commands[3], ['set', 'allow_google_signals', false]);
  assert.deepEqual(f.analyticsConfig(), {
    send_page_view: true,
    page_location: 'https://5varepair.com/',
    page_referrer: '',
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  assert.ok(
    commands.some(
      ([type, destination]) =>
        type === 'config' && destination === 'AW-18107060066/gh8dCJiDvKgdEOKej7pD',
    ),
  );
  assert.equal(f.phoneConfig().phone_conversion_number, PHONE);
  assert.deepEqual(f.phoneConfig().phone_conversion_options, { timeout: 5000, cache: false });
  assert.ok(!commands.some(([kind]) => kind === 'event' || kind === 'user_data'));
  f.allow.fire('click');
  f.init();
  assert.equal(
    f.scripts.length,
    1,
    'duplicate interaction or initialization must not load another tag',
  );
});

test('the old call-only preference never enables Analytics or the expanded permission', () => {
  for (const choice of ['allowed', 'denied']) {
    const f = fixture({
      legacyStored: JSON.stringify({ version: 1, choice, savedAt: NOW }),
    });
    assert.equal(f.scripts.length, 0);
    assert.equal(f.browser.dataLayer, undefined);
    assert.equal(f.card.hidden, false, 'the expanded scope needs a fresh choice');
    assert.equal(f.storage.has(CONSENT_KEY), false);
    f.contact({ event: 'phone_click', placement: 'header' });
    assert.equal(f.events().length, 0);
  }
});

test('page measurement strips queries, fragments and referrer paths before configuration', () => {
  for (const [referrer, expected] of [
    [
      'https://www.google.com/search?q=private-email%40example.com#private',
      'https://www.google.com',
    ],
    ['https://user:password@example.org/private/customer?zip=19115', 'https://example.org'],
    ['mailto:private@example.com', ''],
    ['not a URL', ''],
  ]) {
    const f = fixture({
      stored: saved('allowed'),
      pathname: '/services/washer-repair/',
      search: '?email=private@example.com&zip=19115#gclid=private',
      referrer,
    });
    assert.equal(
      f.analyticsConfig().page_location,
      'https://5varepair.com/services/washer-repair/',
    );
    assert.equal(f.analyticsConfig().page_referrer, expected);
    assert.doesNotMatch(JSON.stringify(f.commands()), /private|password|customer|19115/);
    assert.equal(
      f
        .commands()
        .filter(([kind, destination]) => kind === 'config' && destination === ANALYTICS_ID).length,
      1,
      'only one GA configuration supplies this static page view',
    );
  }
});

test('call and SMS intent events go once to Analytics only after consent, across button placements', () => {
  const f = fixture({
    pathname: '/blog/washer-not-draining/',
    search: '?email=do-not-send@example.com',
  });
  f.contact({ event: 'phone_click', placement: 'header' });
  f.allow.fire('click');
  assert.equal(f.events().length, 0, 'never replay an interaction from before consent');
  f.init();
  for (const placement of [
    'header',
    'drawer',
    'footer',
    'sticky-call',
    'home-hero',
    'article-sidebar',
  ]) {
    for (const event of ['phone_click', 'sms_click']) {
      const before = f.events().length;
      f.contact({
        event,
        placement,
        path: '/private-path?email=do-not-send@example.com',
        message: 'Never send appliance or customer details',
        phone: '+18005550123',
      });
      assert.equal(f.events().length, before + 1);
      assert.deepEqual(f.events().at(-1), [
        'event',
        event,
        {
          send_to: ANALYTICS_ID,
          page_location: 'https://5varepair.com/blog/washer-not-draining/',
          page_referrer: '',
          placement,
          contact_method: event === 'phone_click' ? 'phone' : 'sms',
        },
      ]);
    }
  }
  assert.doesNotMatch(
    JSON.stringify(f.events()),
    /AW-|conversion|generate_lead|private|18005550123/,
  );
  const count = f.events().length;
  f.decline.fire('click');
  f.contact({ event: 'phone_click', placement: 'footer' });
  assert.equal(f.events().length, count, 'withdrawal blocks events immediately, before the reload');
});

test('unrecognized events are ignored and arbitrary placement text cannot leak into Analytics', () => {
  const f = fixture({ stored: saved('allowed') });
  for (const detail of [
    undefined,
    null,
    'phone_click',
    {},
    { event: 'generate_lead' },
    { event: 'conversion' },
  ])
    f.contact(detail);
  assert.equal(f.events().length, 0);
  for (const placement of [
    'private@example.com',
    'Call +1 555 123 4567',
    'x'.repeat(41),
    undefined,
    12,
  ]) {
    f.contact({ event: 'sms_click', placement });
    assert.equal(f.events().at(-1)[2].placement, 'site');
  }
  assert.doesNotMatch(JSON.stringify(f.events()), /private|555|xxxx/);
});

test('DNI replaces call text and tel together while preserving icons, CTA labels and direct SMS', () => {
  const f = fixture({ stored: saved('allowed') });
  assert.equal(f.numberLink.getAttribute('href'), HREF, 'keep real number until a valid callback');
  const callback = f.phoneConfig().phone_conversion_callback;
  callback('+1 (800) 555-0123', '+18005550123');
  for (const link of f.callLinks) assert.equal(link.getAttribute('href'), 'tel:+18005550123');
  assert.equal(f.numberLink.textContent, 'Call +1 (800) 555-0123');
  assert.equal(f.numberLink.getAttribute('aria-label'), 'Call +1 (800) 555-0123');
  assert.equal(f.numberLink.childNodes[0], f.icon);
  assert.equal(f.numberLink.childNodes[2], f.strong);
  assert.equal(f.genericLink.textContent, 'Call for free');
  assert.equal(f.sms.getAttribute('href'), 'sms:+12677048588');
  assert.equal(f.sms.textContent, `Text ${PHONE}`);
  callback('not a phone number', 'javascript:alert(1)');
  callback('+44 20 7946 0123', '+442079460123');
  callback('+1 (800) 555-0124', '+18005550123');
  assert.equal(f.numberLink.getAttribute('href'), 'tel:+18005550123');
  f.scripts[0].onerror();
  assert.equal(f.numberLink.getAttribute('href'), HREF, 'tag failure restores the direct number');
  assert.equal(f.numberText.nodeValue, PHONE);
});

test('saved, expired, malformed or blocked preferences fail closed and never store an ad click ID', () => {
  for (const stored of [
    saved('denied'),
    saved('allowed', NOW - CONSENT_MAX_AGE),
    saved('allowed', NOW + 1),
    saved('allowed', NOW, 0),
    saved('allowed', NOW, 1),
    saved('allowed', NOW, 2, 'calls-only'),
    saved('unknown'),
    saved('allowed', String(NOW)),
    '{broken',
  ]) {
    const f = fixture({ search: '?wbraid=example', stored });
    assert.equal(f.scripts.length, 0, stored);
    assert.equal(f.browser.dataLayer, undefined);
  }
  const accepted = fixture({ stored: saved('allowed', NOW - 1000) });
  assert.equal(accepted.scripts.length, 1, 'valid acceptance applies to subsequent pages');
  assert.equal(accepted.card.hidden, true);
  const blocked = fixture({ search: '?gclid=example', blockedStorage: true });
  assert.equal(blocked.scripts.length, 0);
  blocked.allow.fire('click');
  assert.equal(blocked.scripts.length, 1, 'explicit current-page choice remains usable');
  assert.equal(blocked.storage.size, 0);
  const readOnly = fixture({ stored: saved('allowed'), blockedWrites: true });
  assert.equal(readOnly.scripts.length, 0, 'read-only persisted permission cannot auto-enable');
});

test('a failed denial write cannot re-enable stale stored permission after reload', () => {
  const f = fixture({ stored: saved('allowed') });
  assert.equal(f.scripts.length, 1);
  f.blockWrites({ removal: true });
  f.decline.fire('click');
  assert.equal(f.reloads, 1);
  assert.equal(f.numberLink.getAttribute('href'), HREF);
  assert.equal(JSON.parse(f.storage.get(CONSENT_KEY)).choice, 'allowed');
  const reloaded = fixture({ stored: f.storage.get(CONSENT_KEY), blockedWrites: true });
  assert.equal(reloaded.scripts.length, 0);
  assert.equal(reloaded.browser.dataLayer, undefined);
  const transient = fixture({ stored: saved('allowed') });
  transient.blockWrites();
  transient.decline.fire('click');
  assert.equal(
    transient.storage.has(CONSENT_KEY),
    false,
    'remove stale acceptance when removal is possible',
  );
  const nextPage = fixture({ stored: transient.storage.get(CONSENT_KEY) });
  assert.equal(nextPage.scripts.length, 0);
});

test('checking writable storage cannot overwrite a newer denial from another tab', () => {
  const f = fixture({ stored: saved('allowed'), deniedDuringProbe: true });
  assert.equal(f.scripts.length, 0);
  assert.equal(f.browser.dataLayer, undefined);
  assert.equal(JSON.parse(f.storage.get(CONSENT_KEY)).choice, 'denied');
  assert.equal(f.storage.has(`${CONSENT_KEY}-write-test`), false);
});

test('withdrawal restores direct calls, preserves SMS, clears only known first-party measurement cookies and reloads', () => {
  const f = fixture({ stored: saved('allowed') });
  const callback = f.phoneConfig().phone_conversion_callback;
  f.storage.set('_gcl_ls', 'post-consent Google storage');
  f.storage.set('unrelated', 'keep');
  callback('+1 (800) 555-0123', '+18005550123');
  f.opener.fire('click');
  assert.equal(f.decline.textContent, 'Turn off measurement');
  f.decline.fire('click');
  assert.equal(f.reloads, 1);
  assert.equal(f.scripts[0].removed, true);
  assert.equal(JSON.parse(f.storage.get(CONSENT_KEY)).choice, 'denied');
  for (const link of f.callLinks) assert.equal(link.getAttribute('href'), HREF);
  assert.equal(f.numberText.nodeValue, PHONE);
  assert.equal(f.numberLink.getAttribute('aria-label'), `Call ${PHONE}`);
  assert.equal(f.sms.getAttribute('href'), 'sms:+12677048588');
  assert.equal(f.cookies.length, 12);
  assert.equal(f.storage.has('_gcl_ls'), false);
  assert.equal(f.storage.get('unrelated'), 'keep');
  assert.ok(f.cookies.every((cookie) => /^(?:_ga|_ga_TEST|_gcl_aw|gwcc)=; Max-Age=0/.test(cookie)));
  assert.ok(
    f
      .commands()
      .some(
        ([kind, operation, state]) =>
          kind === 'consent' && operation === 'update' && state.analytics_storage === 'denied',
      ),
    'withdrawal must immediately deny Analytics as well as clear first-party cookies',
  );
  callback('+1 (800) 555-0123', '+18005550123');
  assert.equal(f.numberLink.getAttribute('href'), HREF, 'ignore a late callback after withdrawal');
  const deniedReload = fixture({ stored: f.storage.get(CONSENT_KEY) });
  assert.equal(deniedReload.scripts.length, 0);
  const blockedCookies = fixture({ stored: saved('allowed'), blockedCookies: true });
  blockedCookies.decline.fire('click');
  assert.equal(blockedCookies.reloads, 1, 'blocked cookie access must not prevent a denied reload');
});

test('withdrawal or invalidation in another tab stops measurement; a storage event cannot silently grant it', () => {
  for (const next of [
    saved('denied'),
    saved('allowed', NOW - CONSENT_MAX_AGE),
    saved('allowed', NOW, 0),
    null,
  ]) {
    const f = fixture({ stored: saved('allowed') });
    f.phoneConfig().phone_conversion_callback('+1 (800) 555-0123', '+18005550123');
    if (next === null) f.storage.delete(CONSENT_KEY);
    else f.storage.set(CONSENT_KEY, next);
    f.browser.fire('storage', { key: next === null ? null : CONSENT_KEY });
    assert.equal(f.reloads, 1);
    assert.equal(f.numberLink.getAttribute('href'), HREF);
  }
  const organic = fixture();
  organic.storage.set(CONSENT_KEY, saved('allowed'));
  organic.browser.fire('storage', { key: CONSENT_KEY });
  assert.equal(organic.scripts.length, 0);
});

test('preview, HTTP, another hostname and absent production controls cannot load the tag', () => {
  for (const option of [
    { hostname: 'localhost' },
    { hostname: 'www.5varepair.com' },
    { hostname: 'preview.example' },
    { protocol: 'http:' },
    { port: '444' },
    { noCard: true },
  ]) {
    const f = fixture({ ...option, stored: saved('allowed'), search: '?gclid=example' });
    assert.equal(f.scripts.length, 0);
    assert.equal(f.opener.hidden, true);
    assert.equal(f.numberLink.getAttribute('href'), HREF);
  }
});

test('a page restored from browser history rechecks withdrawn or expired consent', () => {
  for (const next of [saved('denied'), saved('allowed', NOW - CONSENT_MAX_AGE)]) {
    const f = fixture({ stored: saved('allowed') });
    f.phoneConfig().phone_conversion_callback('+1 (800) 555-0123', '+18005550123');
    f.storage.set(CONSENT_KEY, next);
    f.browser.fire('pageshow', { persisted: true });
    assert.equal(f.reloads, 1);
    assert.equal(f.numberLink.getAttribute('href'), HREF);
  }
});

test('consent controls start hidden without JavaScript and SMS copy never promises the forwarding number', async () => {
  const component = await readFile(
    new URL('../src/components/CallMeasurement.astro', import.meta.url),
    'utf8',
  );
  assert.match(component, /<section[^>]+id="call-privacy"[^>]+\bhidden/);
  const footer = await readFile(new URL('../src/components/Footer.astro', import.meta.url), 'utf8');
  assert.match(footer, /<button[^>]+data-call-measurement-open[^>]+\bhidden/);
  for (const file of ['components/Header.astro', 'components/CTA.astro', 'pages/contact.astro']) {
    const content = await readFile(new URL(`../src/${file}`, import.meta.url), 'utf8');
    assert.doesNotMatch(content, /(?:text|messaging app)[^<.]*same number/i);
  }
});
