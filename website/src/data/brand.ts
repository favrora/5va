// Exact logo used on the Google Business Profile, October 24, 2026.
export const brandMark =
  '<svg xmlns="http://www.w3.org/2000/svg" width="700" height="700" viewBox="0 0 700 700" role="img" aria-labelledby="logo-title logo-description">\n  <title id="logo-title">5VA Appliance Repair</title>\n  <desc id="logo-description">Navy blue 5VA wordmark with a small repair wrench and the words Appliance Repair on a white background.</desc>\n  <rect width="700" height="700" fill="#ffffff"/>\n  <g fill="#193b70">\n    <path d="M371 153C356 145 338 149 328 162C322 170 321 181 325 191L301 215C295 221 295 231 301 237C307 243 317 243 323 237L347 213C361 218 377 212 385 200C391 190 391 178 386 169L370 185L354 169Z" transform="translate(23 5) scale(.93)"/>\n    <circle cx="313" cy="215" r="4" fill="#ffffff"/>\n    <g transform="translate(-5 20)">\n      <path d="M105 250H254V287H149V318C164 311 180 309 192 309C235 309 261 335 261 379C261 425 230 453 183 453C143 453 111 431 101 399L144 390C149 408 164 418 183 418C205 418 218 403 218 380C218 357 206 344 183 344C168 344 155 349 145 358L106 348Z"/>\n      <path d="M271 250H318L352 393L386 250H433L377 453H327Z"/>\n      <path fill-rule="evenodd" d="M488 250H537L609 453H561L548 413H475L462 453H416ZM487 377H537L512 302Z"/>\n    </g>\n    <text x="350" y="541" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="39" font-weight="700" letter-spacing="2" textLength="494" lengthAdjust="spacingAndGlyphs">APPLIANCE REPAIR</text>\n  </g>\n</svg>\n';

// Keep the official square mark/favicons intact; website variants reuse its exact paths.
// The wrench hole is a transparent cutout so neither variant paints a white patch.
function websiteWordmark(ink: string, description: string) {
  return brandMark
    .replace(
      /<desc id="logo-description">.*?<\/desc>/,
      `<desc id="logo-description">${description}</desc>`,
    )
    .replace(
      '<rect width="700" height="700" fill="#ffffff"/>',
      '<defs><mask id="wrench-cutout" maskUnits="userSpaceOnUse" x="0" y="0" width="700" height="700"><rect width="700" height="700" fill="white"/><circle cx="313" cy="215" r="4" fill="black"/></mask></defs>',
    )
    .replace('<g fill="#193b70">', `<g fill="${ink}" mask="url(#wrench-cutout)">`)
    .replace('    <circle cx="313" cy="215" r="4" fill="#ffffff"/>\n', '');
}

export const brandWordmark = websiteWordmark(
  '#193b70',
  '5VA Appliance Repair wordmark on a transparent background.',
);
export const brandWordmarkLight = websiteWordmark(
  '#faf7ef',
  'Light 5VA Appliance Repair wordmark on a transparent background.',
);
