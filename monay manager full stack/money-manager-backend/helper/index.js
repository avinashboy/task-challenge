const validator = require("validator");

module.exports = {
  cleanEscape: (message = "") => {
    return validator.escape(message);
  },

  cleanUnescape: (message = "") => {
    return validator.unescape(message);
  },

  isEmail: (email = "") => {
    return validator.isEmail(email);
  },

  isEmpty: (message = "") => {
    return validator.isEmpty(message);
  },

  isAlphanumeric: (message = "") => {
    return validator.isAlphanumeric(message);
  },

  getHoursDiff: (dt2,dt1)=>{
    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60 * 60);
  return Math.abs(Math.round(diff));
  }
};
