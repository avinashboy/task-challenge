require("dotenv").config();

module.exports = {
    DB_URL : process.env.DB_URL,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    APIKEY : process.env.APIKEY,
    AUTHDOMAIN : process.env.AUTHDOMAIN,
    PROJECTID : process.env.PROJECTID,
    STORAGEBUCKET : process.env.STORAGEBUCKET,
    MESSAGINGSENDERID : process.env.MESSAGINGSENDERID,
    APPID: process.env.APPID,
}