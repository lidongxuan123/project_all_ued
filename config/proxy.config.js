export default {
  '/user-center': {
    target: 'http://uc-backend.uportal.svc.tb.zsmart.com:8080',
      changeOrigin: true,
      pathRewrite: { '^/user-center': '/user-center' },
  },
  '/eshopweb': {
    target: 'http://172.16.24.71:8053/',
      changeOrigin: true,
      pathRewrite: { '^/eshopweb': '/eshopweb' },
  }
};
