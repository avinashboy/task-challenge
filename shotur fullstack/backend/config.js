const dotenv = require("dotenv");
dotenv.config({ path: "./dotenv/.env" });

module.exports = {
  DB_URL: process.env.DB_URL,
  MAIL_VERIFICATION_SECRET_KEY: process.env.MAIL_VERIFICATION_SECRET_KEY,
  JWT_VERIFICATION_SECRET_KEY: process.env.JWT_VERIFICATION_SECRET_KEY,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  APP_URL: process.env.APP_URL,
  USER_EMAIL: process.env.USER_EMAIL,
  USER_PASSWORD: process.env.USER_PASSWORD,
  RATE_LIMIT: process.env.RATE_LIMIT,
};