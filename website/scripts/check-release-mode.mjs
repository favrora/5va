import { execFileSync } from 'node:child_process';
import { mkdtemp, readFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import assert from 'node:assert/strict';
import { PRODUCTION_ORIGIN } from '../release-config.mjs';

// Build isolated fixtures; no DNS, provider API, deployment or change to dist/.
const temporaryRoot = await mkdtemp(join(tmpdir(), '5va-seo-check-'));
async function walk(directory) {
  return (
    await Promise.all(
      (await readdir(directory, { withFileTypes: true })).map((entry) => {
        const path = join(directory, entry.name);
        return entry.isDirectory() ? walk(path) : path;
      }),
    )
  ).flat();
}
try {
  for (const [mode, origin] of [
    ['preview', 'https://preview.example'],
    ['production', PRODUCTION_ORIGIN],
  ]) {
    const output = join(temporaryRoot, mode);
    execFileSync(resolve('node_modules/.bin/astro'), ['build', '--outDir', output], {
      env: { ...process.env, SITE_ENV: mode, SITE_URL: origin },
      stdio: 'pipe',
    });
    const files = await walk(output);
    const pages = files.filter((file) => file.endsWith('.html'));
    assert.equal(pages.length, 33);
    for (const page of pages) {
      const html = await readFile(page, 'utf8');
      assert.match(
        html,
        mode === 'production' && !page.endsWith('/404.html')
          ? /name="robots" content="index, follow, max-image-preview:large"/
          : /name="robots" content="noindex, nofollow"/,
      );
      assert.ok(html.includes(`rel="canonical" href="${origin}/`));
      assert.doesNotMatch(html, /AggregateRating|streetAddress|latitude|longitude/);
    }
    const home = await readFile(join(output, 'index.html'), 'utf8');
    const robots = await readFile(join(output, 'robots.txt'), 'utf8');
    const sitemap = await readFile(join(output, 'sitemap.xml'), 'utf8');
    const contact = await readFile(join(output, 'contact/index.html'), 'utf8');
    assert.equal(
      robots,
      mode === 'production'
        ? `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`
        : 'User-agent: *\nDisallow: /\n',
    );
    assert.ok(!sitemap.includes('localhost') && !sitemap.includes('127.0.0.1'));
    assert.doesNotMatch(home + contact, /<(?:form|input|textarea|select)(?:\s|>)/i);
    assert.match(contact, /href="tel:\+12677048588"/);
    assert.match(contact, /href="sms:\+12677048588"/);
    assert.ok(home.includes(`property="og:image" content="${origin}/images/5va-social.png"`));
    const social = await readFile(join(output, 'images/5va-social.png'));
    assert.equal(social.subarray(1, 4).toString(), 'PNG');
    assert.equal(social.readUInt32BE(16), 1200);
    assert.equal(social.readUInt32BE(20), 630);
  }
  console.log(
    'Release fixtures verified: explicit approved production origin, 32 indexable production URLs, noindex previews and 404, robots/sitemap, phone-only contacts, no private address or review-star manipulation. Existing dist/ unchanged.',
  );
} catch (error) {
  if (error.stdout) process.stderr.write(error.stdout.toString().slice(-3000));
  throw error;
} finally {
  await rm(temporaryRoot, { recursive: true, force: true });
}
