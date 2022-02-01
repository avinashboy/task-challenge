const express = require("express");
const router = express.Router();
const {mailVerifyToken} = require("../middleware/jwt")
const {validationPasswordReset} = require("../middleware/user.valiation")
const {APP_URL} = require("../config")
const {savePassword} = require("../logic/user.logic")


router.get("/", [mailVerifyToken],(req, res) =>{
    res.setHeader("Content-Security-Policy", "script-src 'nonce-EDNnf03nceIOfn39fn3e9h3sdfa' 'self' https://cdnjs.cloudflare.com https://unpkg.com;");
    res.render("forgot", {uuid: req.user.id, url: APP_URL })
})


router.post("/", [validationPasswordReset],async (req, res) =>{
    const {new_password,uuid} = req.body
    const status = await savePassword({currentPassword: new_password, uuid})
    if(!status) return res.status(400).send({"message": "Password couldn't updated yet"})
    res.status(200).send({"message": "Password updated successfully"})
})

module.exports = router;