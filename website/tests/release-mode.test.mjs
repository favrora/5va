import test from 'node:test';
import assert from 'node:assert/strict';
import { getReleaseSettings, PRODUCTION_ORIGIN } from '../release-config.mjs';

test('an external canonical URL alone never opens a preview to indexing', () => {
  assert.equal(
    getReleaseSettings({ siteUrl: 'https://preview.example', siteEnv: 'preview' }).isProduction,
    false,
  );
  assert.equal(
    getReleaseSettings({ siteUrl: PRODUCTION_ORIGIN, siteEnv: 'preview' }).isProduction,
    false,
  );
});

test('production indexing requires the explicit approved HTTPS origin', () => {
  assert.deepEqual(getReleaseSettings({ siteUrl: PRODUCTION_ORIGIN, siteEnv: 'production' }), {
    site: PRODUCTION_ORIGIN,
    isProduction: true,
  });
  for (const siteUrl of [
    'http://localhost:4321',
    'https://preview.example',
    'http://5varepair.com',
    'https://www.5varepair.com',
  ]) {
    assert.throws(
      () => getReleaseSettings({ siteUrl, siteEnv: 'production' }),
      /Production SITE_URL/,
    );
  }
});

test('invalid release labels and non-origin URLs fail before a build', () => {
  assert.throws(() => getReleaseSettings({ siteEnv: 'prod' }), /SITE_ENV/);
  for (const siteUrl of [
    'https://5varepair.com/preview/',
    'https://user:pass@5varepair.com',
    'https://5varepair.com/?preview=1',
    'file:///tmp/site',
  ]) {
    assert.throws(
      () => getReleaseSettings({ siteUrl, siteEnv: 'production' }),
      /plain HTTP\(S\) origin/,
    );
  }
});
