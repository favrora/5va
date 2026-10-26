const TAG_ID = 'AW-18107060066';
const CONVERSION = `${TAG_ID}/gh8dCJiDvKgdEOKej7pD`;
export const ANALYTICS_ID = 'G-Y98Z0R2BVN';
const NUMBER = '+1 (267) 704-8588';
const PHONE_HREF = 'tel:+12677048588';
export const CONSENT_KEY = '5va-measurement-v2';
export const CONSENT_SCOPE = 'analytics-and-ad-calls';
export const CONSENT_MAX_AGE = 180 * 24 * 60 * 60 * 1000;

type Choice = 'allowed' | 'denied';
type TagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...parameters: unknown[]) => void;
};

// This permission includes Analytics and ad-call measurement. The old call-only permission
// is intentionally not read. Hard-gate both products, including cookieless Analytics pings.
export function initCallMeasurement({
  window: browser = window,
  document: page = document,
  now = Date.now,
}: { window?: Window; document?: Document; now?: () => number } = {}) {
  const card = page.querySelector<HTMLElement>('#call-privacy');
  if (!card || card.dataset.ready || browser.location.origin !== 'https://5varepair.com') return;
  const allow = card.querySelector<HTMLButtonElement>('[data-call-allow]');
  const decline = card.querySelector<HTMLButtonElement>('[data-call-decline]');
  const message = card.querySelector<HTMLElement>('[data-call-message]');
  const openers = [...page.querySelectorAll<HTMLButtonElement>('[data-call-measurement-open]')];
  if (!allow || !decline || !message) return;
  card.dataset.ready = 'true';

  let allowed = false;
  let loaded = false;
  let tag: HTMLScriptElement | undefined;
  let returnFocus: HTMLButtonElement | undefined;
  const initialMessage = message.textContent;
  const callLinks = [...page.querySelectorAll<HTMLAnchorElement>(`a[href="${PHONE_HREF}"]`)];
  function numberNodes(node: Node): { node: Node; original: string }[] {
    if (node.nodeType === 3)
      return node.nodeValue?.includes(NUMBER) ? [{ node, original: node.nodeValue }] : [];
    return [...node.childNodes].flatMap(numberNodes);
  }
  const originals = callLinks.map((link) => ({
    link,
    nodes: numberNodes(link),
    ariaLabel: link.getAttribute('aria-label'),
  }));

  function restoreNumber() {
    for (const { link, nodes, ariaLabel } of originals) {
      link.setAttribute('href', PHONE_HREF);
      for (const { node, original } of nodes) node.nodeValue = original;
      if (ariaLabel !== null) link.setAttribute('aria-label', ariaLabel);
    }
  }
  function replaceNumber(formatted: unknown, mobile: unknown) {
    if (!allowed || typeof mobile !== 'string' || typeof formatted !== 'string') return;
    const digits = mobile.replace(/\D/g, '');
    if (!/^1\d{10}$/.test(digits) || formatted.replace(/\D/g, '') !== digits) return;
    // Text nodes preserve icons and CTA wording; SMS and structured data are never selected.
    const display = `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
    for (const { link, nodes, ariaLabel } of originals) {
      link.setAttribute('href', `tel:+${digits}`);
      for (const { node, original } of nodes) node.nodeValue = original.replaceAll(NUMBER, display);
      if (ariaLabel?.includes(NUMBER))
        link.setAttribute('aria-label', ariaLabel.replaceAll(NUMBER, display));
    }
  }
  function readChoice(): Choice | undefined {
    try {
      const raw = browser.localStorage.getItem(CONSENT_KEY);
      const saved = JSON.parse(raw || 'null');
      const age = now() - saved?.savedAt;
      if (
        saved?.version === 2 &&
        saved.scope === CONSENT_SCOPE &&
        ['allowed', 'denied'].includes(saved.choice) &&
        typeof saved.savedAt === 'number' &&
        Number.isFinite(age) &&
        age >= 0 &&
        age < CONSENT_MAX_AGE
      ) {
        if (saved.choice === 'allowed') {
          // Do not re-enable from stale permission when storage has become read-only.
          // A separate temporary probe must never overwrite another tab's newer denial.
          const probe = `${CONSENT_KEY}-write-test`;
          browser.localStorage.setItem(probe, '1');
          try {
            if (browser.localStorage.getItem(probe) !== '1') return;
          } finally {
            browser.localStorage.removeItem(probe);
          }
          if (browser.localStorage.getItem(CONSENT_KEY) !== raw) return;
        }
        return saved.choice;
      }
    } catch {
      // Storage may be unavailable. Calls still work and no consent is assumed.
    }
  }
  function saveChoice(choice: Choice) {
    try {
      browser.localStorage.setItem(
        CONSENT_KEY,
        JSON.stringify({ version: 2, scope: CONSENT_SCOPE, choice, savedAt: now() }),
      );
    } catch {
      // An explicit choice still applies to this page when storage is unavailable.
      if (choice === 'denied') {
        try {
          browser.localStorage.removeItem(CONSENT_KEY);
        } catch {
          // The stored-acceptance roundtrip also blocks a read-only denied reload.
        }
      }
    }
  }
  function pageLocation() {
    return `${browser.location.origin}${browser.location.pathname}`;
  }
  function referrerOrigin() {
    try {
      const referrer = new URL(page.referrer);
      return ['http:', 'https:'].includes(referrer.protocol) ? referrer.origin : '';
    } catch {
      return '';
    }
  }
  function loadTag() {
    if (!allowed || loaded) return;
    loaded = true;
    const target = browser as TagWindow;
    const layer = (target.dataLayer = target.dataLayer || []);
    const gtag =
      target.gtag ||
      function (..._parameters: unknown[]) {
        layer.push(arguments);
      };
    target.gtag = gtag;
    gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
    });
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'denied',
      analytics_storage: 'granted',
    });
    gtag('set', 'allow_ad_personalization_signals', false);
    gtag('set', 'allow_google_signals', false);
    gtag('js', new Date(now()));
    gtag('config', ANALYTICS_ID, {
      send_page_view: true,
      page_location: pageLocation(),
      page_referrer: referrerOrigin(),
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
    gtag('config', TAG_ID);
    gtag('config', CONVERSION, {
      phone_conversion_number: NUMBER,
      phone_conversion_callback: replaceNumber,
      phone_conversion_options: { timeout: 5000, cache: false },
    });
    tag = page.createElement('script');
    tag.async = true;
    tag.src = `https://www.googletagmanager.com/gtag/js?id=${TAG_ID}`;
    tag.onerror = restoreNumber;
    page.head.appendChild(tag);
  }
  function closeCard() {
    card!.hidden = true;
    if (returnFocus) returnFocus.focus({ preventScroll: true });
    else if (card!.contains(page.activeElement)) openers[0]?.focus({ preventScroll: true });
    returnFocus = undefined;
  }
  function showCard(opener?: HTMLButtonElement) {
    returnFocus = opener;
    message!.textContent = allowed
      ? 'Google Analytics and ad-call measurement are enabled for this browser. You can turn them off; calls and texts will keep working.'
      : initialMessage;
    allow!.textContent = allowed ? 'Keep enabled' : 'Allow measurement';
    decline!.textContent = allowed ? 'Turn off measurement' : 'No thanks';
    card!.hidden = false;
    if (opener) allow!.focus({ preventScroll: true });
  }
  function clearMeasurementCookies() {
    try {
      browser.localStorage.removeItem('_gcl_ls');
    } catch {
      // Google measurement storage may be unavailable or read-only.
    }
    const names = page.cookie.split(';').map((part) => part.split('=')[0].trim());
    for (const name of names.filter((name) =>
      /^(?:_ga(?:_|$)|_gid$|_gat(?:_|$)|_gcl_|_gac_|gwcc$)/.test(name),
    )) {
      for (const domain of ['', '; Domain=5varepair.com', '; Domain=.5varepair.com'])
        page.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax; Secure${domain}`;
    }
  }
  function stopMeasurement() {
    allowed = false;
    restoreNumber();
    if (loaded) {
      const target = browser as TagWindow;
      target.gtag?.('consent', 'update', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
      });
      try {
        clearMeasurementCookies();
      } catch {
        // Cookie access can be blocked; a denied reload must still happen.
      }
      tag?.remove();
      // A loaded third-party script cannot reliably be unloaded. Start a new denied page.
      browser.location.reload();
    }
  }
  allow.addEventListener('click', () => {
    allowed = true;
    saveChoice('allowed');
    closeCard();
    loadTag();
  });
  decline.addEventListener('click', () => {
    saveChoice('denied');
    closeCard();
    stopMeasurement();
  });
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeCard();
  });
  for (const opener of openers) {
    opener.hidden = false;
    opener.addEventListener('click', () => showCard(opener));
  }
  browser.addEventListener('storage', (event) => {
    if (
      (event.key === CONSENT_KEY || event.key === null) &&
      allowed &&
      readChoice() !== 'allowed'
    ) {
      closeCard();
      stopMeasurement();
    }
  });
  browser.addEventListener('pageshow', () => {
    if (allowed && readChoice() !== 'allowed') {
      closeCard();
      stopMeasurement();
    }
  });
  browser.addEventListener('5va:conversion', (event) => {
    if (!allowed || !loaded) return;
    const detail = (event as CustomEvent<unknown>).detail;
    if (!detail || typeof detail !== 'object') return;
    const { event: name, placement } = detail as Record<string, unknown>;
    if (name !== 'phone_click' && name !== 'sms_click') return;
    const safePlacement =
      typeof placement === 'string' && /^[a-z][a-z0-9-]{0,39}$/.test(placement)
        ? placement
        : 'site';
    // A contact click is intent, never a connected call, submitted SMS or Ads conversion.
    // Read the current pathname rather than trusting arbitrary custom-event details.
    (browser as TagWindow).gtag?.('event', name, {
      send_to: ANALYTICS_ID,
      page_location: pageLocation(),
      page_referrer: referrerOrigin(),
      placement: safePlacement,
      contact_method: name === 'phone_click' ? 'phone' : 'sms',
    });
  });
  const choice = readChoice();
  if (choice === 'allowed') {
    allowed = true;
    loadTag();
  } else if (!choice) showCard();
}
