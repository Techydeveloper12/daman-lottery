const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/dev/bulkV2',
    createProxyMiddleware({
      target: 'https://www.fast2sms.com',
      changeOrigin: true,
      pathRewrite: {
        '^/dev/bulkV2': '/dev/bulkV2', // Rewrite the URL to remove the proxy prefix
      },
    })
  );
};