import { readdir, unlink } from 'node:fs/promises';
import { articles } from '../src/data/journal.ts';
import sharp from 'sharp';
const dir = 'assets/generated/blog';
const active = new Set(articles.map((article) => article.slug));
for (const output of await readdir('public/images/blog')) {
  if (output.endsWith('.webp') && !active.has(output.replace(/-(600|1200|1536)\.webp$/, '')))
    await unlink(`public/images/blog/${output}`);
}
for (const file of await readdir(dir)) {
  if (!file.endsWith('.png')) continue;
  const slug = file.slice(0, -4);
  if (!active.has(slug)) continue;
  for (const width of [600, 1200, 1536]) {
    await sharp(`${dir}/${file}`)
      .resize({ width })
      .withXmp(
        `<x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description rdf:about="" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:iptc="http://iptc.org/std/Iptc4xmpExt/2008-02-29/"><dc:description><rdf:Alt><rdf:li xml:lang="x-default">AI-generated editorial illustration for a household appliance repair guide</rdf:li></rdf:Alt></dc:description><iptc:DigitalSourceType>http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia</iptc:DigitalSourceType></rdf:Description></rdf:RDF></x:xmpmeta>`,
      )
      .webp({ quality: 80, effort: 6 })
      .toFile(`public/images/blog/${slug}-${width}.webp`);
  }
}
console.log('Prepared 10 editorial covers in three responsive WebP sizes');
