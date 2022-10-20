const CONFIG = {
  URL:
    process.env.URL ??
    'https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1',
  CODE: process.env.CODE ?? 'EXR-0001',
  APP_ENV: process.env.APP_ENV ?? 'development',
  SECRET: process.env.SECRET ?? 'secret'
};

export default CONFIG;
