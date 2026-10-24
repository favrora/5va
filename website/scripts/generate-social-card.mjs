// A code-native brand card, independent of the removed house illustration.
import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';
import { brandMark } from '../src/data/brand.ts';
const mark = brandMark.replace(/<svg[^>]*>/, '').replace('</svg>', '');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#193b35"/><circle cx="1070" cy="440" r="300" fill="none" stroke="#59735d" stroke-width="2"/><circle cx="1065" cy="140" r="20" fill="#f6c445"/><g transform="translate(65 28) scale(.20)">${mark}</g><g font-family="Arial,Helvetica,sans-serif"><text x="224" y="105" fill="#faf9f5" font-size="47" font-weight="800">5VA</text><text x="226" y="130" fill="#c6d8c5" font-size="13" letter-spacing="2">APPLIANCE REPAIR</text><text x="63" y="259" fill="#faf9f5" font-size="73" font-weight="800" letter-spacing="-3">Philadelphia appliance</text><text x="63" y="346" fill="#f6c445" font-size="68" font-weight="800" letter-spacing="-3">repair for your home</text><text x="68" y="411" fill="#c6d8c5" font-size="25">Household appliances · PA &amp; NJ · Call or text</text><text x="68" y="523" fill="#faf9f5" font-size="40" font-weight="700">+1 (267) 704-8588</text><text x="68" y="565" fill="#c6d8c5" font-size="21">Free call · No obligation to book</text></g></svg>`;
await writeFile('public/images/5va-social.svg', svg);
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile('public/images/5va-social.png');
console.log('Created 1200 × 630 brand sharing card');
