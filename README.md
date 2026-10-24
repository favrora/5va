# 5VA Appliance Repair

English static Astro website for residential appliance repair at customers’ homes. Production: https://5varepair.com

## Confirmed business scope

- Call or SMS +1 267-704-8588. Daily 7 AM–8 PM Eastern. No customer intake/shop address.
- Philadelphia ZIP codes 19115/19116, all Montgomery County PA, and the exact additional PA/NJ ZIPs in `website/src/data/territory.ts`. No statewide coverage claim.
- Household appliances only; no commercial equipment, appliance sales or retail parts sales. Initial conversation is free; repair pricing follows on-site inspection. No invented warranties, fixed fees, certifications or availability.
- Genuine Google Business Profile logo and work photos; blog images are editorial illustrations. Google review excerpts are an attributed dated snapshot, not a live API feed or self-serving review-star markup.

## Development

Use Node 22.22.0 or newer. From `website/`: `npm ci`, `npm run dev`. Local builds stay noindex.

## Production release

From `website/`: `SITE_ENV=production SITE_URL=https://5varepair.com npm run build`, `npm test`, `npm run validate:html`. The 404 remains noindex.

Pushing `main` runs the checked production build and the isolated SSH deployment in `.github/workflows/deploy-production.yml`. Only built static files are sent to the dedicated production site. See `infra/deploy/README.md` for credentials, release checks and rollback. Secrets are held in GitHub Actions, never this repository.

The older `codex/preview` branch contains generated GitHub Pages review files and stays separate from production source. Research, private operations, account details, credentials and local project instructions are excluded from this public repository.
