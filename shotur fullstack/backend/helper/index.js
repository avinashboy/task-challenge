const validator = require("validator")

module.exports = {
    cleanEscape: (message)=>{
        return validator.escape(message)
    },

    cleanUnescape: (message)=>{
        return validator.unescape(message)
    },

    isEmail: (email)=>{
        return validator.isEmail(email)
    },

    isEmpty: (message)=>{
        return validator.isEmpty(message)
    },

    isAlphanumeric: (message)=>{
        return validator.isAlphanumeric(message)
    },

    isUrl: (message)=>{
        return validator.isURL(message)
    }
    
  };