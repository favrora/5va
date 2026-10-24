# AWS deployment preparation

This is a deployment design and a locally tested URL rewrite function. No AWS resource, DNS record or live deployment has been created. The application is a multi-page Astro static site; build output is website/dist/. There is no PHP server or persistent form backend in this package.

## Build and production identity

From the website directory, use the owner-confirmed HTTPS origin as SITE_URL when preparing a production artifact. The domain below is a documentation placeholder:

```sh
SITE_URL='https://your-confirmed-domain.example' npm run build
node --test ../infra/cloudfront-function.test.mjs
```

Replace the example domain before using the artifact. Confirm the exact business name, +1 267-704-8588 contact number, Maps profile, service area, current reviews and any license/warranty claims. SITE_URL feeds Astro's site URL and must agree with visible canonical links, Open Graph URLs, JSON-LD and sitemap entries.

The project owner manages generated robots.txt, sitemap.xml and page robots metadata in the website source. Local/development builds are intentionally noindex. Before a public launch, inspect the actual production build: the final origin must be correct, permitted pages must be indexable, and robots must reference the matching sitemap. Keep staging noindex and verify that a production build has not accidentally retained those settings. robots directives are discovery controls, not access control.

public/llms.txt currently uses relative internal links because the production domain is unconfirmed. At launch, convert those links to the confirmed canonical URLs or verify that the chosen deployment serves the relative links correctly. It is an optional navigation aid.

## Private S3 origin and CloudFront

Use a dedicated S3 bucket with Block Public Access enabled, Bucket owner enforced ownership and versioning. Enable normal S3 encryption. Point CloudFront at the regional S3 REST endpoint, not the S3 website-hosting endpoint. Configure Origin Access Control (OAC) with request signing set to always. Restrict the bucket policy to s3:GetObject for the CloudFront service principal and this distribution's SourceArn; the deployment role has separate write access. The regular S3 origin/OAC combination is documented by [AWS](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html).

For example, replace every placeholder in this bucket policy before review:

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "ReadFromOneCloudFrontDistribution",
    "Effect": "Allow",
    "Principal": {"Service": "cloudfront.amazonaws.com"},
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::REPLACE_BUCKET/*",
    "Condition": {
      "StringEquals": {
        "AWS:SourceArn": "arn:aws:cloudfront::REPLACE_ACCOUNT:distribution/REPLACE_DISTRIBUTION"
      }
    }
  }]
}
```

Use a CloudFront TLS certificate in ACM us-east-1 for the approved hostnames. Redirect HTTP to HTTPS, use a current TLS security policy, allow GET/HEAD, and enable compression. Choose one canonical hostname; an alternate hostname needs a deliberate permanent redirect preserving the path and query. This repository does not guess that hostname or provide a redirect destination.

Attach cloudfront-function.js to the viewer-request event of the HTML behavior using runtime cloudfront-js-2.0. The function does not change cache behavior selection or the chosen origin. AWS documents [directory-index rewrites](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/example_cloudfront_functions_url_rewrite_single_page_apps_section.html).

| Viewer request | Result |
| --- | --- |
| / | /index.html |
| /services/ | /services/index.html |
| /services | HTTP 308 to /services/ |
| /services?tag=one&tag=two | HTTP 308 to /services/?tag=one&tag=two |
| /services/refrigerator-repair/ | /services/refrigerator-repair/index.html |
| /images/kitchen-hero.webp | unchanged |
| /robots.txt, /sitemap.xml, /llms.txt | unchanged |
| /.well-known/acme-challenge/token | unchanged |
| /api, /api/, /api/reviews | unchanged; handled by the API behavior |

Public links/canonicals use trailing slashes. Extensionless non-root GET/HEAD requests receive a 308 permanent redirect to the matching slash URL, preserving the query. Root and directory URLs then receive an internal index.html object-key rewrite, with no redirect loop. Assets and well-known resources remain untouched. The /api path and all /api/ descendants bypass both canonicalization and rewriting; keep their Lambda/API origin in its separate behavior. The function leaves non-read methods unchanged; the static behavior should reject unsupported methods.

Query handling uses the guarded request.rawQueryString() method when available. This is explicitly documented in [AWS CloudFront Functions general helper methods](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/general-helper-methods.html): runtime 2.0 exposes the method directly on the request, without importing the cloudfront module. It returns the original query without its leading question mark, an empty string for a bare question mark, or undefined when no query exists. This preserves parameter order, duplicate keys, bare flags and original percent encoding.

For plain event objects without that helper, the fallback follows AWS's [query normalization example](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/example_cloudfront_functions_normalize_query_string_parameters_section.html): serialize each query field, and use every multiValue entry instead of repeating the separate first value. The tests include the ID/Exp/TTL/NoValue/querymv fixture from [AWS's event-structure documentation](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-event-structure.html). The fallback retains query values and duplicates without double-encoding; the object cannot reconstruct original interleaving of different duplicate keys or distinguish a bare flag from an empty value. The runtime helper preserves those original details.

Astro's 404.html should be uploaded. Configure CloudFront custom error responses for origin 403 and 404 to /404.html with HTTP status 404 and a short error TTL, after proving that existing pages are accessible with OAC. S3 can report a missing private object as 403; do not use a success-status homepage fallback. Test permission failures separately, because mapping 403 to 404 can conceal a broken OAC policy. See [AWS custom error responses](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DownloadDistValuesErrorPages.html).

## Cache and MIME policy

| File group | Suggested object Cache-Control | Notes |
| --- | --- | --- |
| /_astro/ content-hashed assets | public, max-age=31536000, immutable | Retain old hash files for open pages and rollback. |
| HTML pages and 404.html | public, max-age=0, s-maxage=300, must-revalidate | CloudFront minimum TTL must allow origin policy; invalidate for an immediate release. |
| robots.txt, sitemap.xml, llms.txt | public, max-age=0, s-maxage=300, must-revalidate | Discovery controls need timely updates. |
| Fixed-name public images/fonts | public, max-age=3600, must-revalidate | Use long immutable caching only after versioning the filename. |

S3 uploads must have correct Content-Type: text/html for HTML, text/plain for robots/llms, application/xml for the sitemap, image/webp for WebP, text/css for CSS and a JavaScript MIME type for scripts. Serve UTF-8 text. Enable CloudFront gzip/Brotli with a compatible cache policy. Avoid cookies and unnecessary query parameters in the static cache key; UTM values can remain in the browser URL without producing duplicate cached HTML.

## Response security headers

Attach one reviewed CloudFront response headers policy to every public behavior. Start from AWS's [managed SecurityHeadersPolicy](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-response-headers-policies.html) or a matching custom policy, then verify the actual headers. Recommended custom settings are X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin-when-cross-origin, X-Frame-Options: DENY, and Permissions-Policy restricting unused camera, microphone and geolocation access.

Enable HSTS with max-age=31536000 once HTTPS works on the final host. Do not add includeSubDomains or preload until every relevant subdomain is ready. A Content-Security-Policy should start in Report-Only against the final generated build, then be enforced after checking necessary inline Astro scripts, styles and any external map/font origins. Do not ship a guessed restrictive CSP that disables navigation or calls. Response policies are documented by [AWS](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/modifying-response-headers.html).

Do not upload repository files, local notes, node_modules, environment files, research or source code: upload the contents of website/dist/ only. Static hosting cannot process a form submission by itself; keep any contact flow honest about whether it opens an SMS/call or needs a separately implemented endpoint.

## Release, invalidation and rollback

1. Preserve the verified build artifact, release identifier, object manifest and current CloudFront/function configuration. Keep the previous release artifact and S3 versions.
2. Upload new hashed assets first, then HTML and discovery files, preserving correct metadata. Avoid deleting old hashed assets during the release.
3. Publish and associate the tested function only after using CloudFront's own test stage with representative event objects. Local tests validate logic; they do not replace an AWS runtime/configuration test.
4. Request an explicit CloudFront invalidation for updated public paths and their rewritten object keys. For a small first release, a quoted /* invalidation is simple and complete; future releases can target /, /index.html, affected directory paths and their index.html objects, plus changed discovery/fixed-name files. Verify request completion and watch for errors. AWS explains [invalidation paths](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/invalidation-specifying-objects.html).
5. Smoke-test homepage, nested service page, slashless 308 redirect with repeated query parameters, WebP/CSS/JS, robots/sitemap/llms, API bypass, Maps links, call link, mobile drawer, HTTPS redirect and a random missing URL. Confirm Content-Type, cache/security headers, HTTP 404 and the production canonical origin.
6. For rollback, restore the previous exact artifact and metadata from the saved release or S3 versions, restore the prior function/distribution configuration if changed, and invalidate the affected paths again. Keep old asset versions until rollback verification passes. DNS/certificate changes require their own recorded rollback.

No CLI deployment command is run by these notes. Resource creation, production publication, domain changes and paid infrastructure need a separate explicit deployment request with the final target account/domain.

## Local function verification

```sh
node --test infra/cloudfront-function.test.mjs
```

Run from the project root. Tests cover root/directory rewrites, slashless 308 redirects, a redirect-followed-by-rewrite sequence with no loop, dotted parent directories, static assets, discovery files, encoded path/extension preservation, well-known resources, API bypass, the documented AWS multiValue query fixture, encoded/empty queries, the guarded raw-query helper, request/header/cookie preservation, HEAD and non-read methods.
