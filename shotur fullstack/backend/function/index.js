const axios = require("axios");
const parser = require("ua-parser-js");

module.exports = {
  getUserInfoLocation: async (req, res, next) => {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const geo = await axios.get(`https://json.geoiplookup.io/${ip}`);
    req.geo = {
      country: geo.data.country_name || null,
      city: geo.data.city || null,
      state: geo.data.region || null,
    };
    return next();
  },

  deviceType: async (req, res, next) => {
    const ua = parser(req.headers["user-agent"]);
    req.device = ua.os.name;
    next();
  },
};
