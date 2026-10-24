import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const source = readFileSync(new URL('./cloudfront-function.js', import.meta.url), 'utf8');
const context = vm.createContext({});
vm.runInContext(source, context, { filename: 'cloudfront-function.js' });

const requestCases = [
  ['/', '/index.html'],
  ['/services/', '/services/index.html'],
  ['/services/refrigerator-repair/', '/services/refrigerator-repair/index.html'],
  ['/guides.v2/', '/guides.v2/index.html'],
  ['/images/kitchen-hero.webp', '/images/kitchen-hero.webp'],
  ['/_astro/site.a12b34.css', '/_astro/site.a12b34.css'],
  ['/robots.txt', '/robots.txt'],
  ['/sitemap.xml', '/sitemap.xml'],
  ['/llms.txt', '/llms.txt'],
  ['/404.html', '/404.html'],
  ['/encoded%2Ewebp', '/encoded%2Ewebp'],
  ['/encoded%2ewebp', '/encoded%2ewebp'],
  ['/.well-known', '/.well-known'],
  ['/.well-known/', '/.well-known/'],
  ['/.well-known/acme-challenge/token', '/.well-known/acme-challenge/token'],
  ['/.well-known/security.txt', '/.well-known/security.txt'],
  ['/api', '/api'],
  ['/api/', '/api/'],
  ['/api/reviews', '/api/reviews'],
  ['/api/reviews/', '/api/reviews/'],
  ['/api/reviews.json', '/api/reviews.json'],
];

for (const method of ['GET', 'HEAD']) {
  for (const [uri, expected] of requestCases) {
    test(method + ' ' + uri + ' -> ' + expected, () => {
      const request = {
        method,
        uri,
        querystring: { utm_source: { value: 'google' } },
        headers: { host: { value: 'preview.example' } },
        cookies: { session: { value: 'unchanged' } },
      };
      const originalQuery = request.querystring;
      const originalHeaders = request.headers;
      const originalCookies = request.cookies;
      const result = context.handler({ request });
      assert.equal(result, request);
      assert.equal(result.uri, expected);
      assert.equal(result.method, method);
      assert.equal(result.querystring, originalQuery);
      assert.equal(result.headers, originalHeaders);
      assert.equal(result.cookies, originalCookies);
    });
  }
}

const redirectCases = [
  ['/services', '/services/'],
  ['/services/refrigerator-repair', '/services/refrigerator-repair/'],
  ['/v1.0/guides', '/v1.0/guides/'],
  ['/service%20areas', '/service%20areas/'],
  ['/apiary', '/apiary/'],
  ['//services', '/services/'],
];

for (const method of ['GET', 'HEAD']) {
  for (const [uri, expected] of redirectCases) {
    test(method + ' ' + uri + ' redirects permanently to ' + expected, () => {
      const request = { method, uri, headers: { host: { value: 'preview.example' } }, querystring: {}, cookies: {} };
      const before = structuredClone(request);
      const result = context.handler({ request });
      assert.equal(result.statusCode, 308);
      assert.equal(result.statusDescription, 'Permanent Redirect');
      assert.equal(result.headers.location.value, expected);
      assert.deepEqual(request, before, 'redirect must not mutate the original request');
    });
  }

  test(method + ' preserves the AWS documented object query fixture and every multiValue', () => {
    // Shape and values from AWS functions-event-structure.html example event.
    const querystring = {
      ID: { value: '42' },
      Exp: { value: '1619740800' },
      TTL: { value: '1440' },
      NoValue: { value: '' },
      querymv: { value: 'val1', multiValue: [{ value: 'val1' }, { value: 'val2,val3' }] },
    };
    const request = { method, uri: '/services', querystring, headers: {} };
    const before = structuredClone(request);
    const result = context.handler({ request });
    assert.equal(result.statusCode, 308);
    assert.equal(result.headers.location.value,
      '/services/?ID=42&Exp=1619740800&TTL=1440&NoValue=&querymv=val1&querymv=val2,val3');
    const parsed = new URL(result.headers.location.value, 'https://preview.example');
    assert.deepEqual(parsed.searchParams.getAll('querymv'), ['val1', 'val2,val3']);
    assert.deepEqual(request, before);
  });

  test(method + ' does not double-encode object query components', () => {
    const request = {
      method, uri: '/contact', headers: {},
      querystring: {
        return: { value: '%2Fservices%2F%3Fpart%3Da%26b%3Dc' },
        'encoded%20key': { value: 'a+b%20c%252F' },
        empty: { value: '' },
      },
    };
    const result = context.handler({ request });
    assert.equal(result.headers.location.value,
      '/contact/?return=%2Fservices%2F%3Fpart%3Da%26b%3Dc&encoded%20key=a+b%20c%252F&empty=');
  });

  for (const [raw, suffix] of [
    [undefined, ''],
    ['', '?'],
    ['name=John&age=25&city=Boston', '?name=John&age=25&city=Boston'],
    ['tag=one&utm_source=google&tag=two&flag&value=%2F%3F%26%3D&space=a+b&empty=',
      '?tag=one&utm_source=google&tag=two&flag&value=%2F%3F%26%3D&space=a+b&empty='],
  ]) {
    test(method + ' uses the guarded rawQueryString helper for ' + String(raw), () => {
      const request = {
        method, uri: '/services', headers: {},
        querystring: { deliberately: { value: 'unused' } },
        rawQueryString() { return raw; },
      };
      const result = context.handler({ request });
      assert.equal(result.statusCode, 308);
      assert.equal(result.headers.location.value, '/services/' + suffix);
      assert.equal(request.uri, '/services');
    });
  }

  test(method + ' canonical redirect is followed by one directory rewrite with no loop', () => {
    const querystring = { utm_source: { value: 'google' } };
    const first = context.handler({ request: { method, uri: '/services', querystring, headers: {} } });
    const target = new URL(first.headers.location.value, 'https://preview.example');
    assert.equal(first.statusCode, 308);
    const secondRequest = { method, uri: target.pathname, querystring, headers: {} };
    const second = context.handler({ request: secondRequest });
    assert.equal(second, secondRequest);
    assert.equal(second.uri, '/services/index.html');
    assert.equal(second.querystring, querystring);
  });
}

for (const method of ['POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']) {
  test(method + ' leaves request untouched', () => {
    const request = { method, uri: '/services/', headers: {}, querystring: {} };
    const before = structuredClone(request);
    assert.equal(context.handler({ request }), request);
    assert.deepEqual(request, before);
  });
}
