import test from 'node:test';
import assert from 'node:assert/strict';
import { areas } from '../src/data/content.ts';
import { postalCodes } from '../src/data/territory.ts';

test('local area pages use only confirmed ZIPs and represent the county rule independently', () => {
  const listedZIPs = new Set([...postalCodes.PA, ...postalCodes.NJ]);
  for (const area of areas) {
    assert.ok(
      area.zips.every((zip) => listedZIPs.has(zip)),
      area.slug,
    );
  }
  assert.deepEqual(
    areas.filter((area) => area.includesMontgomeryCounty).map((area) => area.slug),
    ['montgomery-county', 'pennsylvania'],
  );
  assert.deepEqual(areas.find((area) => area.slug === 'montgomery-county').zips, []);
  assert.deepEqual(areas.find((area) => area.slug === 'levittown').zips, ['19054', '19056']);
  assert.deepEqual(areas.find((area) => area.slug === 'pennsylvania').zips, postalCodes.PA);
  assert.deepEqual(areas.find((area) => area.slug === 'new-jersey').zips, postalCodes.NJ);
});
