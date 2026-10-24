import assert from 'node:assert/strict';
import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Package a separately validated local build; production sources and dist stay intact.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const input = join(root, 'dist');
const output = join(root, 'preview-dist');
const origin = 'https://favrora.github.io';
const base = '/5va/';
const previewURL = origin + base;
const localOrigin = /https?:\/\/(?:localhost|127\.0\.0\.1):4321/g;

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

function prefix(path) {
  return path.startsWith(base) ? path : base + path.slice(1);
}

const home = await readFile(join(input, 'index.html'), 'utf8');
assert.match(home, /rel="canonical" href="http:\/\/localhost:4321\/"/);
assert.match(home, /name="robots" content="noindex, nofollow"/);
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(input, output, { recursive: true });

for (const file of await walk(output)) {
  if (!/\.(?:html|css|js|svg|xml|txt)$/.test(file)) continue;
  let text = await readFile(file, 'utf8');
  text = text.replace(localOrigin, origin + base.slice(0, -1));
  text = text.replace(
    /(\b(?:href|src|poster|data-src)=)(["'])(\/(?!\/)[^"']*)\2/g,
    (_, attribute, quote, path) => attribute + quote + prefix(path) + quote,
  );
  text = text.replace(
    /\bsrcset="([^"]+)"/g,
    (_, sources) =>
      'srcset="' +
      sources.replace(
        /(^|,\s*)(\/(?!\/)[^\s,]+)/g,
        (_, separator, path) => separator + prefix(path),
      ) +
      '"',
  );
  text = text.replace(
    /url\(\s*(["']?)(\/(?!\/)[^)'"\s]+)\1\s*\)/g,
    (_, quote, path) => 'url(' + quote + prefix(path) + quote + ')',
  );
  if (file.endsWith('.txt'))
    text = text.replace(/\]\((\/(?!\/)[^)]+)\)/g, (_, path) => '](' + prefix(path) + ')');
  if (file.endsWith('.html'))
    text = text.replace(/(<meta name="robots" content=")[^"]+("\s*\/?>)/g, '$1noindex, nofollow$2');
  await writeFile(file, text);
}

// GitHub Pages must serve Astro's underscore-prefixed asset directory unchanged.
await writeFile(join(output, '.nojekyll'), '');
await writeFile(join(output, 'robots.txt'), 'User-agent: *\nDisallow: /5va/\n');
await writeFile(
  join(output, 'README.md'),
  '# 5VA website preview\n\nPublic review build: ' +
    previewURL +
    '\n\nThis repository contains generated static assets only. Preview pages request no indexing. The canonical production site is https://5varepair.com/.\n',
);

let links = 0;
let srcsets = 0;
let styles = 0;
const pages = (await walk(output)).filter((file) => file.endsWith('.html'));
async function verify(path, file) {
  const url = new URL(path, origin);
  assert.ok(
    url.pathname.startsWith(base),
    relative(output, file) + ': escaped preview base: ' + path,
  );
  const target = join(
    output,
    decodeURIComponent(url.pathname.slice(base.length)),
    url.pathname.endsWith('/') ? 'index.html' : '',
  );
  await stat(target).catch(() => {
    throw new Error(relative(output, file) + ': missing preview target ' + path);
  });
  if (url.hash && target.endsWith('.html')) {
    assert.ok(
      (await readFile(target, 'utf8')).includes(
        'id="' + decodeURIComponent(url.hash.slice(1)) + '"',
      ),
      'Missing anchor: ' + path,
    );
  }
}
for (const file of pages) {
  const html = await readFile(file, 'utf8');
  assert.match(html, /name="robots" content="noindex, nofollow"/);
  assert.doesNotMatch(html, /localhost|127\.0\.0\.1|AggregateRating|maps\.googleapis\.com/);
  assert.doesNotMatch(html, /<(?:form|input|textarea|select)(?:\s|>)/i);
  assert.match(html, /href="tel:\+12677048588"/);
  assert.ok(html.includes('rel="canonical" href="' + previewURL));
  for (const match of html.matchAll(/(?:href|src|poster|data-src)="(\/(?!\/)[^"]+)"/g)) {
    await verify(match[1], file);
    links++;
  }
  for (const match of html.matchAll(/srcset="([^"]+)"/g)) {
    for (const source of match[1].split(',')) {
      const path = source.trim().split(/\s+/)[0];
      if (path.startsWith('/')) await verify(path, file);
      srcsets++;
    }
  }
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g))
    JSON.parse(match[1]);
}
for (const file of (await walk(output)).filter((file) => file.endsWith('.css'))) {
  for (const match of (await readFile(file, 'utf8')).matchAll(/url\(["']?(\/(?!\/)[^)'"\s]+)/g)) {
    await verify(match[1], file);
    styles++;
  }
}
assert.equal(pages.length, 33);
console.log(
  JSON.stringify(
    {
      previewURL,
      output,
      pages: pages.length,
      verifiedLinks: links,
      srcsetCandidates: srcsets,
      cssResources: styles,
      noindex: true,
      productionDistUnchanged: true,
    },
    null,
    2,
  ),
);
