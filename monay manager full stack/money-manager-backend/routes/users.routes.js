var express = require("express");
var router = express.Router();
const {validatorData} = require("../middleware/user.middleware")
const userModel = require("../models/user.models")
const { cleanEscape } = require("../helper");
const { v4: uuidv4 } = require("uuid");
const createError = require("http-errors");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../config');


router.post("/login", async (req, res, next) => {
  const {email, password} = req.body;

  try {
    const data = await userModel.findOne({email: cleanEscape(email)})
  if(!data) return res.send(createError.NotFound("Not found"))
  const match = await bcrypt.compare(password, data.password)
  if(!match) return res.send(createError.BadRequest("Incorrect password"))
  const name = data.email.split('@')[0]
  const token = jwt.sign({ user: data.uuid, name }, SECRET_KEY, { algorithm: 'HS256', expiresIn: "24h" })
  return res.status(200).send({token})
  } catch (error) {
    console.log('error:', error)
    return res.send(createError.BadRequest("Failed to create it"));
  }
  
});


router.post("/register", [validatorData], async (req, res, next) => {
  const {email, password} = req.body;
  const salt = await bcrypt.genSaltSync(10)
  const hash = await bcrypt.hashSync(password, salt)
  const userSave = new userModel({
    uuid: uuidv4(),
    email: cleanEscape(email),
    password: hash
  })
  try {
    await userSave.save();
    return res.status(201).send({ message: "Successful created" });
  } catch (error) {
    console.log("error:", error);
    return res.send(createError.BadRequest("Failed to create it"));
  }
});

module.exports = router;
