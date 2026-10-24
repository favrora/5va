import test from 'node:test';
import assert from 'node:assert/strict';
import { articles, relatedArticles } from '../src/data/journal.ts';
import { articles as originalArticles, services } from '../src/data/content.ts';
import { localGuides } from '../src/data/local-guides.ts';

const localTopics = {
  'washer-leaking-water-philadelphia': 'washer-repair',
  'refrigerator-making-noise-philadelphia': 'refrigerator-repair',
  'appliance-repair-philadelphia': 'refrigerator-repair',
  'dryer-not-heating-philadelphia': 'dryer-repair',
  'dishwasher-not-draining': 'dishwasher-repair',
  'oven-not-heating': 'oven-stove-repair',
  'refrigerator-leaking-water': 'refrigerator-repair',
  'freezer-not-freezing': 'freezer-repair',
  'appliance-repair-visit-checklist': 'washer-repair',
};
const originalSlugs = [
  'refrigerator-not-cooling',
  'washer-not-draining',
  'appliance-repair-or-replace',
];
const normalize = (value) => value.trim().replace(/\s+/g, ' ').toLowerCase();
const sharesService = (left, right) =>
  left.relatedServices.some((slug) => right.relatedServices.includes(slug));

test('the journal has twelve appliance guides and preserves the three original appliance topics', () => {
  assert.equal(articles.length, 12);
  assert.deepEqual(
    localGuides.map((article) => article.slug).sort(),
    Object.keys(localTopics).sort(),
  );
  assert.deepEqual(
    originalArticles.map((article) => article.slug).sort(),
    [...originalSlugs].sort(),
  );
  assert.deepEqual(
    articles.slice(0, localGuides.length).map((article) => article.slug),
    localGuides.map((article) => article.slug),
    'new local guides should be discoverable before the existing general guides',
  );
  assert.deepEqual(
    articles.map((article) => article.slug).sort(),
    [...Object.keys(localTopics), ...originalSlugs].sort(),
  );
  for (const original of originalArticles) {
    const article = articles.find((item) => item.slug === original.slug);
    assert.equal(article.title, original.title);
    assert.equal(article.description, original.description);
    assert.deepEqual(article.sections, original.sections);
  }
});

test('each guide has its own route, search intent, and concise distinct SEO title', () => {
  for (const field of ['slug', 'primaryKeyword', 'seoTitle']) {
    const values = articles.map((article) => {
      assert.equal(typeof article[field], 'string', `${article.slug}: ${field}`);
      assert.ok(article[field].trim(), `${article.slug}: empty ${field}`);
      return normalize(article[field]);
    });
    assert.equal(new Set(values).size, articles.length, `duplicate ${field}`);
  }
  for (const article of articles) {
    assert.match(article.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(article.seoTitle.length <= 70, `${article.slug}: SEO title is too long`);
  }
});

test('service links resolve and local guides lead to the agreed primary service', () => {
  const serviceSlugs = new Set(services.map((service) => service.slug));
  for (const article of articles) {
    assert.ok(article.relatedServices.length > 0, `${article.slug}: no service destination`);
    assert.equal(new Set(article.relatedServices).size, article.relatedServices.length);
    for (const slug of article.relatedServices) {
      assert.ok(serviceSlugs.has(slug), `${article.slug}: unknown service ${slug}`);
    }
  }
  for (const [slug, service] of Object.entries(localTopics)) {
    const article = articles.find((item) => item.slug === slug);
    assert.equal(article.relatedServices[0], service, `${slug}: primary CTA destination`);
    assert.ok(['kitchen', 'laundry', 'planning'].includes(article.group));
  }
});

test('new local guides have navigable sections, useful FAQ data, and primary-source links', () => {
  const primaryDomains = new Set([
    'geappliances.com',
    'whirlpool.com',
    'nfpa.org',
    'foodsafety.gov',
  ]);
  for (const slug of Object.keys(localTopics)) {
    const article = articles.find((item) => item.slug === slug);
    assert.ok(article.takeaway.trim(), `${slug}: missing quick answer`);
    assert.ok(article.wordCount >= 350, `${slug}: insufficient useful editorial content`);
    assert.ok(article.sections.length >= 4, `${slug}: no article sections`);
    const headings = article.sections.map((section) => {
      assert.ok(section.heading.trim(), `${slug}: empty table-of-contents label`);
      assert.ok(section.paragraphs.length > 0, `${slug}: empty section`);
      for (const paragraph of section.paragraphs) {
        assert.ok(paragraph.trim(), `${slug}: blank paragraph`);
      }
      return normalize(section.heading);
    });
    assert.equal(new Set(headings).size, headings.length, `${slug}: duplicate navigation label`);
    assert.equal(article.faqs.length, 3, `${slug}: expected three editorial FAQs`);
    assert.equal(new Set(article.faqs.map((faq) => normalize(faq.q))).size, 3);
    for (const faq of article.faqs) {
      assert.ok(faq.q.trim() && faq.a.trim(), `${slug}: unanswered FAQ`);
    }
    assert.ok(article.sources.length > 0, `${slug}: no source attribution`);
    for (const source of article.sources) {
      assert.ok(source.title.trim(), `${slug}: source label missing`);
      const url = new URL(source.url);
      assert.equal(url.protocol, 'https:', `${slug}: source must use HTTPS`);
      assert.equal(url.username + url.password, '', `${slug}: unexpected URL credentials`);
      assert.ok(
        [...primaryDomains].some(
          (domain) => url.hostname === domain || url.hostname.endsWith(`.${domain}`),
        ),
        `${slug}: review the primary-source policy for ${url.hostname}`,
      );
    }
  }
});

test('reading time is derived from the full editorial text, including the quick answer and FAQs', () => {
  for (const article of articles) {
    const visibleText = [
      article.title,
      article.description,
      article.takeaway,
      ...article.sections.flatMap(({ heading, paragraphs }) => [heading, ...paragraphs]),
      ...article.faqs.flatMap(({ q, a }) => [q, a]),
    ].join(' ');
    const actualWords = visibleText.match(/\S+/g)?.length ?? 0;
    assert.ok(actualWords > 0, `${article.slug}: empty guide`);
    assert.equal(article.wordCount, actualWords, `${article.slug}: stale word count`);
    assert.equal(
      article.readTime,
      `${Math.max(1, Math.ceil(actualWords / 200))} min read`,
      `${article.slug}: reading time should follow the current text`,
    );
  }
});

test('related guides exclude the current page, remain unique, and resolve to real articles', () => {
  for (const article of articles) {
    const recommendations = relatedArticles(article.slug);
    assert.equal(recommendations.length, 3);
    assert.equal(new Set(recommendations.map((item) => item.slug)).size, recommendations.length);
    for (const recommendation of recommendations) {
      assert.notEqual(recommendation.slug, article.slug);
      assert.ok(articles.includes(recommendation), `${article.slug}: unknown recommendation`);
    }
    const allOthers = relatedArticles(article.slug, articles.length);
    assert.deepEqual(
      allOthers.map((item) => item.slug).sort(),
      articles
        .filter((item) => item.slug !== article.slug)
        .map((item) => item.slug)
        .sort(),
    );
    assert.deepEqual(relatedArticles(article.slug, 0), []);
  }
});

test('guides with a matching service are recommended before unrelated topics', () => {
  for (const article of articles) {
    const matches = articles.filter(
      (candidate) => candidate.slug !== article.slug && sharesService(article, candidate),
    );
    if (!matches.length) continue;
    const first = relatedArticles(article.slug, 1);
    assert.equal(first.length, 1);
    assert.ok(sharesService(article, first[0]), `${article.slug}: unrelated first recommendation`);
    const recommendations = relatedArticles(article.slug, articles.length);
    assert.ok(
      recommendations
        .slice(0, matches.length)
        .every((candidate) => sharesService(article, candidate)),
      `${article.slug}: a relevant project guide should appear before unrelated topics`,
    );
  }
});
