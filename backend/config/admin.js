module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '80252e5683120dd4ab64fcd4dffbd3c1'),
  },
});
