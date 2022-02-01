const createError = require("http-errors");
const { isEmpty,isEmail, cleanEscape } = require("../helper");
const userModel = require("../models/user.models");

module.exports = {
  validatorData: async (req, res, next) => {
    for (const prop in req.body) {
      if (isEmpty(req.body[prop]))
        return res.send(createError.BadRequest(`Don't leave ${prop}`));
    }
    const cleanEmail = cleanEscape(req.body.email)
    if(!isEmail(cleanEmail)) return res.send(createError.BadRequest("Not a valid email address."))
    const data = await userModel.findOne({
      email: cleanEmail
    });

    if(data) return res.send(createError.BadRequest(" Already in use."))
    next();
  },
};
