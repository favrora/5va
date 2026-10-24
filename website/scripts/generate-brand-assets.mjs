import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { brandMark } from '../src/data/brand.ts';
const publicDirectory = new URL('../public/', import.meta.url);
await writeFile(new URL('favicon.svg', publicDirectory), brandMark);
await writeFile(new URL('brand-mark.svg', publicDirectory), brandMark);
for (const [name, size] of [
  ['favicon-32.png', 32],
  ['apple-touch-icon.png', 180],
]) {
  await sharp(Buffer.from(brandMark))
    .resize(size, size)
    .png()
    .toFile(fileURLToPath(new URL(name, publicDirectory)));
}
console.log('Created matching SVG, 32px favicon and 180px touch icon.');
