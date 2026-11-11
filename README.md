# 5VA Appliance Repair

A production website for a Philadelphia-area appliance repair business, built with Astro and TypeScript. Service pages, local coverage, and an editorial blog share a static build and a single deployment pipeline.

[Live website](https://5varepair.com/) · [Repair guides](https://5varepair.com/blog/) · [Deployment workflow](.github/workflows/deploy-production.yml)

## Engineering highlights

- **Static delivery.** Astro generates HTML from shared layouts and typed content. Navigation, service information, and contact links work without JavaScript. Interactive features enhance the rendered pages.
- **Search and content architecture.** Service and article routes use shared data, canonical URLs, and structured metadata. The sitemap is generated from the same route data. Release configuration limits indexable builds to the production origin.
- **Performance and accessibility.** Responsive WebP covers, self-hosted fonts, keyboard navigation, and reduced-motion support are part of the site implementation.
- **Consent-aware measurement.** Optional analytics and call measurement load after consent. Direct contact links provide a fallback when measurement is unavailable.
- **Verified releases.** GitHub Actions runs the test suite, builds the site, and validates generated HTML before deployment. The receiver stages each release and activates it atomically.

## Run locally

Requires Node.js 22.22.0 or later.

```bash
cd website
npm ci
npm run dev
```

Open [localhost:4321](http://localhost:4321). Local builds use preview indexing settings.

To run the website checks from the same directory:

```bash
npm test
npm run build
npm run validate:html
```

## Where to look

| Area | Source |
| --- | --- |
| Page routes and shared UI | [website/src/pages](website/src/pages) and [website/src/components](website/src/components) |
| Article catalog and related guides | [website/src/data/journal.ts](website/src/data/journal.ts) |
| Indexing and canonical origin | [website/release-config.mjs](website/release-config.mjs) |
| Build and behavior checks | [website/scripts](website/scripts) and [website/tests](website/tests) |
| Deployment and release activation | [GitHub Actions workflow](.github/workflows/deploy-production.yml) and [infra/deploy](infra/deploy) |
