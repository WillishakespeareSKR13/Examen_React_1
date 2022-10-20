module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['storage.googleapis.com']
  },
  env: {
    URL: process.env.URL,
    CODE: process.env.CODE,
    APP_ENV: process.env.APP_ENV,
    SECRET: process.env.SECRET
  }
};
