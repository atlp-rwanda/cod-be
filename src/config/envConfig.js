/**
 * Add all environment variables to be validate for being set here
 */
const envKeys = {
  APP_NAME: process.env.APP_NAME,
  APP_URL: process.env.APP_URL,
  PORT: process.env.PORT,
  DB_NAME: process.env.DB_NAME,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  TEST_DB_NAME: process.env.TEST_DB_NAME,
  TEST_DB_HOST: process.env.TEST_DB_HOST,
  TEST_DB_PORT: process.env.TEST_DB_PORT,
  TEST_DB_USERNAME: process.env.TEST_DB_USERNAME,
  TEST_DB_PASSWORD: process.env.TEST_DB_PASSWORD,
  APP_DEBUG: process.env.APP_DEBUG,
  JWT_KEY: process.env.JWT_KEY,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  SENDER_EMAIL: process.env.SENDER_EMAIL,
  REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
  FB_CLIENT_ID: process.env.FB_CLIENT_ID,
  FB_CLIENT_SECRET: process.env.FB_CLIENT_SECRET,
  FB_CALLBACK_URL: process.env.FB_CALLBACK_URL
};
export default envKeys;
