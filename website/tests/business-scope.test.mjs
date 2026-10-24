import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { services, areas } from '../src/data/content.ts';
import { preparation } from '../src/data/projects.ts';
import { articles } from '../src/data/journal.ts';
import { business } from '../src/data/business.ts';

test('published catalog cannot reintroduce unrelated home repairs', () => {
  const expected = [
    'refrigerator-repair',
    'washer-repair',
    'dryer-repair',
    'oven-stove-repair',
    'dishwasher-repair',
    'freezer-repair',
    'microwave-repair',
    'ice-maker-repair',
  ];
  assert.deepEqual(services.map((s) => s.slug).sort(), expected.sort());
  assert.deepEqual(Object.keys(preparation).sort(), expected);
  assert.doesNotMatch(
    JSON.stringify({ services, articles }),
    /handyman|drywall|carpentry|furniture assembly/i,
  );
  for (const service of services) {
    assert.ok(service.symptoms.length >= 3);
    assert.ok(service.details.length >= 3);
    assert.ok(service.faqs.length >= 3);
  }
});
test('Philadelphia remains primary and PA/NJ pages require location confirmation', () => {
  assert.equal(areas[0].slug, 'philadelphia');
  for (const slug of ['pennsylvania', 'new-jersey']) {
    const area = areas.find((a) => a.slug === slug);
    assert.equal(area?.kind, 'State');
    assert.match(area.intro, /ZIP code/);
    assert.match(area.localNote, /not|confirm/);
  }
  assert.equal(business.phoneHref, 'tel:+12677048588');
  assert.equal(business.smsHref, 'sms:+12677048588');
  assert.equal(new URL(business.mapsUrl).searchParams.get('cid'), '12282828888363558368');
});
test('all active article covers exist in responsive sizes and retain source metadata', async () => {
  for (const article of articles) {
    for (const width of [600, 1200, 1536]) {
      const file = new URL(`../public/images/blog/${article.slug}-${width}.webp`, import.meta.url);
      assert.ok((await stat(file)).size < 300000, `${article.slug}: image budget`);
      const image = await readFile(file);
      assert.ok(
        image.includes(Buffer.from('trainedAlgorithmicMedia')),
        `${article.slug}: source metadata missing`,
      );
    }
  }
});
