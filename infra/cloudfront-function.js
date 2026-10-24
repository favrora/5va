// CloudFront Functions, viewer-request event, runtime cloudfront-js-2.0.
// Astro uses output: 'static', trailingSlash: 'always', build.format: 'directory'.
// Canonicalize slashless pages, then rewrite directory requests to S3 keys.
function querySuffix(request) {
  // Runtime 2.0 can retain the exact query, including encoding and key order.
  if (typeof request.rawQueryString === 'function') {
    var raw = request.rawQueryString();
    return raw === undefined ? '' : '?' + raw;
  }

  // Plain AWS event fixtures expose querystring as an object. Its multiValue
  // already includes the first value; never append the separate value twice.
  var query = request.querystring || {};
  if (typeof query === 'string') {
    return query ? '?' + query : '';
  }
  var parts = [];
  Object.keys(query).forEach(function (key) {
    var field = query[key];
    var values = field.multiValue && field.multiValue.length ? field.multiValue : [field];
    values.forEach(function (item) {
      // CloudFront supplies encoded query components. Do not double-encode.
      parts.push(key + '=' + item.value);
    });
  });
  return parts.length ? '?' + parts.join('&') : '';
}

function handler(event) {
  var request = event.request;
  var uri = request.uri;

  // This static origin serves read requests only. Do not change other methods.
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return request;
  }

  // API routes belong to their own origin/behavior. Well-known resources can
  // legitimately be extensionless and must retain their exact paths.
  if (uri === '/api' || uri.indexOf('/api/') === 0
      || uri === '/.well-known' || uri.indexOf('/.well-known/') === 0) {
    return request;
  }

  if (uri.charAt(uri.length - 1) === '/') {
    request.uri = uri + 'index.html';
    return request;
  }

  // Only inspect the final component: dotted parent directories are valid.
  // Do not decode the URI; preserve encoded resource names and extensions.
  var filename = uri.substring(uri.lastIndexOf('/') + 1);
  if (filename.indexOf('.') === -1 && !/%2e/i.test(filename)) {
    return {
      statusCode: 308,
      statusDescription: 'Permanent Redirect',
      headers: {
        // A Location beginning // is a network-path reference. Collapse only
        // leading duplicate slashes so the redirect always stays on this host.
        location: { value: uri.replace(/^\/+/, '/') + '/' + querySuffix(request) }
      }
    };
  }

  return request;
}
