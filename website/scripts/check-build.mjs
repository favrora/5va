import { readdir, readFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { getReleaseSettings } from '../release-config.mjs';
import { postalCodes } from '../src/data/territory.ts';
import { join, resolve } from 'node:path';
import assert from 'node:assert/strict';
if (existsSync('.env')) process.loadEnvFile('.env');
const release = getReleaseSettings();
const expectedPostalCodes = Object.values(postalCodes).flat().sort();
const dist = resolve('dist');
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory() ? walk(join(dir, entry.name)) : join(dir, entry.name),
      ),
    )
  ).flat();
}
const files = await walk(dist);
const pages = files.filter((file) => file.endsWith('.html'));
const titles = new Set();
const descriptions = new Set();
const canonicalURLs = [];
let internalLinks = 0;
let schemas = 0;
let images = 0;
const inlineScripts = new Set();
let largestPageJavaScript = 0;
for (const file of pages) {
  const html = await readFile(file, 'utf8');
  const label = file.slice(dist.length);
  assert.doesNotMatch(
    html,
    /<(?:form|input|textarea|select)(?:\s|>)/i,
    `${label}: customer contact must stay phone-only`,
  );
  for (const phone of html.matchAll(/href="(tel:[^"]+)"/g))
    assert.equal(phone[1], 'tel:+12677048588', `${label}: incorrect phone action`);
  assert.match(html, /href="tel:\+12677048588"/, `${label}: a direct call action is required`);
  assert.ok(!html.includes('brand-dot'), `${label}: no dot in the wordmark`);
  assert.doesNotMatch(html, /class="[^"]*\beyebrow\b/, `${label}: no labels above headings`);
  assert.doesNotMatch(
    html,
    /handyman|drywall|carpentry|furniture assembly|HomeAndConstructionBusiness/i,
    `${label}: obsolete business scope`,
  );
  assert.match(html, /No appliance sales/, `${label}: sales exclusion missing`);
  assert.match(html, /No retail parts sales/, `${label}: parts exclusion missing`);
  assert.match(html, /No commercial repairs/, `${label}: commercial exclusion missing`);
  assert.doesNotMatch(
    html,
    /AggregateRating|api\/place|maps\.googleapis\.com|PUBLIC_REVIEWS_ENDPOINT/,
    `${label}: no self-serving review schema or paid Maps integration`,
  );
  for (const heading of html.matchAll(/<h[1-6]\b[^>]*>([\s\S]*?)<\/h[1-6]>/g)) {
    const text = heading[1].replace(/<[^>]*>/g, ' ').trim();
    assert.ok(!text.includes('.'), `${label}: heading ends in a period: ${text}`);
  }
  assert.doesNotMatch(html, /\d+ min read/, `${label}: reading time is not displayed`);

  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${label}: exactly one H1 required`);
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  assert.ok(title, `${label}: title missing`);
  assert.ok(!titles.has(title), `${label}: duplicate title`);
  assert.ok(!/\.$/.test(title.trim()), `${label}: title ends in a period`);
  titles.add(title);
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  assert.ok(description, `${label}: description missing`);
  assert.ok(!descriptions.has(description), `${label}: duplicate description`);
  descriptions.add(description);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  assert.ok(canonical, `${label}: canonical missing`);
  assert.equal(
    new URL(canonical).origin,
    release.site,
    `${label}: canonical origin differs from this build`,
  );
  assert.match(
    html,
    release.isProduction && !label.includes('404')
      ? /name="robots" content="index, follow, max-image-preview:large"/
      : /name="robots" content="noindex, nofollow"/,
    `${label}: incorrect indexing policy`,
  );
  if (!label.includes('404')) canonicalURLs.push(canonical);
  assert.ok(/<html lang="en"/.test(html), `${label}: English locale missing`);
  assert.ok(
    !/929.?933.?0929|lorem ipsum|TODO:|yourdomain\.com/i.test(html),
    `${label}: old phone or placeholder`,
  );
  const pageSchemas = [];
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    const data = JSON.parse(match[1]);
    assert.equal(data['@context'], 'https://schema.org', `${label}: invalid schema context`);
    pageSchemas.push(data);
    schemas++;
  }
  const company = pageSchemas.find((data) => data['@type'] === 'LocalBusiness');
  assert.ok(company, `${label}: shared business identity missing`);
  assert.equal(company['@id'], `${release.site}/#business`);
  assert.equal(company.telephone, '+1-267-704-8588');
  assert.ok(
    !company.address && !company.geo,
    `${label}: do not publish a home address or coordinates`,
  );
  assert.deepEqual(company.sameAs, ['https://www.google.com/maps?cid=12282828888363558368']);
  assert.equal(company.areaServed.length, 36, `${label}: exact territory required`);
  assert.equal(company.areaServed[0].name, 'Montgomery County, Pennsylvania, US');
  assert.deepEqual(
    company.areaServed
      .slice(1)
      .map((area) => area.address.postalCode)
      .sort(),
    expectedPostalCodes,
  );
  const hours = company.openingHoursSpecification;
  assert.equal(hours.length, 1);
  assert.deepEqual(hours[0].dayOfWeek, [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]);
  assert.equal(hours[0].opens, '07:00');
  assert.equal(hours[0].closes, '20:00');
  assert.ok(
    pageSchemas.some(
      (data) => data['@type'] === 'WebSite' && data['@id'] === `${release.site}/#website`,
    ),
    `${label}: site identity missing`,
  );
  assert.ok(
    pageSchemas.some(
      (data) =>
        ['WebPage', 'AboutPage', 'ContactPage', 'CollectionPage'].includes(data['@type']) &&
        data.url === canonical,
    ),
    `${label}: page identity missing`,
  );
  for (const match of html.matchAll(/(?:href|src)="(\/[^"\s]*)"/g)) {
    const url = new URL(match[1], 'http://localhost');
    if (url.pathname.startsWith('/api/')) continue;
    const target = join(
      dist,
      decodeURIComponent(url.pathname),
      url.pathname.endsWith('/') ? 'index.html' : '',
    );
    await stat(target).catch(() => {
      throw new Error(`${label}: missing internal target ${match[1]}`);
    });
    internalLinks++;
    if (url.hash && target.endsWith('.html')) {
      const targetHTML = await readFile(target, 'utf8');
      assert.ok(
        targetHTML.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),
        `${label}: missing anchor ${match[1]}`,
      );
    }
  }
  let pageJavaScript = 0;
  assert.doesNotMatch(
    html,
    /<(?:script|img|iframe|link)\b[^>]*(?:src|href)="https?:\/\/[^"/]*(?:googletagmanager|googleadservices|google-analytics|doubleclick|googlesyndication)\.[^"/]+/i,
    `${label}: Google measurement must never load through a static tag or preconnect`,
  );
  for (const match of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/type="application\/(?:ld\+json|json)"/.test(match[1])) continue;
    const src = match[1].match(/src="([^"]+)"/)?.[1];
    assert.ok(
      !src || src.startsWith('/'),
      `${label}: external JavaScript requires optional consent`,
    );
    if (src?.startsWith('/')) pageJavaScript += (await stat(join(dist, src))).size;
    else if (!src) {
      inlineScripts.add(match[2]);
      pageJavaScript += Buffer.byteLength(match[2]);
    }
  }
  largestPageJavaScript = Math.max(largestPageJavaScript, pageJavaScript);
  for (const match of html.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(
      html.includes(`id="${decodeURIComponent(match[1])}"`),
      `${label}: missing same-page anchor ${match[1]}`,
    );
  }
  for (const match of html.matchAll(/<img\b[^>]*>/g)) {
    assert.ok(/\balt="/.test(match[0]), `${label}: alt missing`);
    assert.ok(
      /\bwidth="/.test(match[0]) && /\bheight="/.test(match[0]),
      `${label}: image dimensions missing`,
    );
    const src = match[0].match(/src="([^"]+)"/)?.[1];
    if (src?.startsWith('/images/'))
      assert.ok((await stat(join(dist, src))).size < 300000, `${label}: image exceeds 300KB`);
    images++;
  }
}
// No public page is orphaned; recommendations and service journeys must resolve.
const incoming = new Map(pages.map((file) => [file, 0]));
for (const file of pages) {
  const html = await readFile(file, 'utf8');
  for (const match of html.matchAll(/href="(\/(?:[^"#?]*\/)?)"/g)) {
    const target = join(dist, decodeURIComponent(match[1]), 'index.html');
    if (target !== file && incoming.has(target)) incoming.set(target, incoming.get(target) + 1);
  }
}
for (const [file, count] of incoming)
  if (!file.endsWith('/404.html')) assert.ok(count > 0, `Orphan content page: ${file}`);
const blogFiles = pages.filter((file) => /\/blog\/[^/]+\/index\.html$/.test(file));
assert.equal(blogFiles.length, 12, 'Every article needs a built page');
for (const file of blogFiles) {
  const html = await readFile(file, 'utf8');
  assert.match(html, /class="guide-cover"/, `${file}: missing editorial cover`);
  assert.ok(
    (html.match(/class="context-reading"/g) || []).length === 1,
    `${file}: contextual article links missing`,
  );
}
const robots = await readFile(join(dist, 'robots.txt'), 'utf8');
assert.equal(
  robots,
  release.isProduction
    ? `User-agent: *\nAllow: /\nSitemap: ${release.site}/sitemap.xml\n`
    : 'User-agent: *\nDisallow: /\n',
  'robots.txt and page-level indexing must agree',
);
const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8');
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
assert.deepEqual(
  [...locations].sort(),
  [...canonicalURLs].sort(),
  'Sitemap must match all public page canonicals and exclude 404',
);
assert.equal(pages.length, locations.length + 1, 'Content pages plus a noindex 404');
assert.equal(pages.length, 35, 'Expected 8 root pages, 8 services, 6 areas, 12 guides, and 404');
const js = files.filter((file) => file.endsWith('.js'));
let javascriptBytes = 0;
for (const file of js) javascriptBytes += (await stat(file)).size;
assert.ok(javascriptBytes < 65000, `Client JS budget exceeded: ${javascriptBytes}`);
const uniqueInlineBytes = [...inlineScripts].reduce(
  (sum, script) => sum + Buffer.byteLength(script),
  0,
);
assert.ok(
  largestPageJavaScript < 20000,
  `Per-page JavaScript budget exceeded: ${largestPageJavaScript}`,
);
console.log(
  `Build verified: ${pages.length} HTML pages, ${internalLinks} local links, ${schemas} JSON-LD blocks, ${images} dimensioned images; ${javascriptBytes.toLocaleString()} external JS bytes + ${uniqueInlineBytes.toLocaleString()} unique inline JS bytes; largest page ${largestPageJavaScript.toLocaleString()} JS bytes. Sitemap matches all ${locations.length} public URLs.`,
);
