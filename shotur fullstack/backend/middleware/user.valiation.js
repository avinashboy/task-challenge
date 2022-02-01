const createError = require("http-errors");
const userModel = require("../models/users.models");
const bcrypt = require("bcrypt");
const { cleanEscape, isEmpty, isAlphanumeric, isEmail } = require("../helper");
const { loginVerificationSecretKey } = require("../middleware/jwt");

module.exports = {
  checkUserDetails: async (req, res, next) => {
    const { username, email } = req.body;

    const cleanEmail = cleanEscape(email);
    const cleanName = cleanEscape(username);

    // validation
    if (!isEmail(cleanEmail))
      return res
        .status(400)
        .send(createError.BadRequest("Not a valid email address."));
    if (isEmpty(cleanName) && !isAlphanumeric(cleanName))
      return res.status(400).send(createError.BadRequest("Don't leave empty."));
    if (!isAlphanumeric(cleanName))
      return res
        .status(400)
        .send(createError.BadRequest("It must be alphanumeric"));

    const data = await userModel.findOne({
      $or: [{ email: cleanEmail }, { username: cleanName }],
    });
    if (data)
      return res
        .status(400)
        .send(createError.BadRequest("User already exist."));

    next();
  },

  checkIfUserActive: async (req, res, next) => {
    const { email, password } = req.body;


    const cleanEmail = cleanEscape(email);
    const cleanPassword = password;

    // validation
    if (!isEmail(cleanEmail))
      return res
        .status(400)
        .send(createError.BadRequest("Not a valid email address."));
    if (isEmpty(cleanPassword))
      return res.status(400).send(createError.BadRequest("Password is empty"));

    const data = await userModel.findOne({ email: cleanEmail });

    if (!data) return res.status(404).send({ message: "Not found" });

    const match = await bcrypt.compare(cleanPassword, data.password);

    if (data.status !== "Active")
      return res
        .status(400)
        .send({ message: "Please verify your email."});
    if (!match)
      return res
        .status(403)
        .send({message: "Password incorrect"});

    req.body.token = loginVerificationSecretKey({
      username: data.username,
      uuid: data.uuid,
    });
    next();
  },

  validationPasswordReset: (req, res, next) => {
    try {
      for (const prop in req.body) {
        if (isEmpty(req.body[prop]))
          return res
            .status(400)
            .send(createError.BadRequest(`Don't leave ${prop}`));
      }
      const { new_password, confirm_password } = req.body;

      if (new_password.length < 7)
        return res.send(
          createError
            .status(400)
            .BadRequest(`Password length must be 8 characters`)
        );
      if (new_password !== confirm_password)
        return res
          .status(400)
          .send(createError.BadRequest(`Password doesn't match`));
      next();
    } catch (error) {
      return res
        .status(400)
        .send({ message: "Please try again later sometimes" });
    }
  },

  checkUserEmail: async (req, res, next) => {
    const { email } = req.body;


    const cleanEmail = cleanEscape(email || "");

    // validation
    if (!isEmail(cleanEmail))
      return res
        .status(400)
        .send({message: "Not a valid email address."});

    const data = await userModel.findOne({ email: cleanEmail });

    if (!data)
      return res.status(400).send({message :"Not found"});

    if (data.status !== "Active")
      return res
        .status(400)
        .send({message:"Please verify your email."});

    if (data.email !== cleanEmail)
      return res.status(400).send({ message: "Email don't match" });

    req.user = { email: data.email, uuid: data.uuid };
    next();
  },
};
