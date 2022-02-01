const express = require("express");
const router = express.Router();
const {mailVerifyToken} = require("../middleware/jwt")
const {validationPasswordReset} = require("../middleware/user.valiation")
const {APP_URL} = require("../config")
const {checkingPasswordMatch} = require("../transaction/user.transaction")
const {savePassword} = require("../logic/user.logic")



router.get("/", [mailVerifyToken],(req, res) =>{
    res.setHeader("Content-Security-Policy", "script-src 'nonce-EDNnf03nceIOfn39fn3e9h3sdfa' 'self' https://cdnjs.cloudflare.com https://unpkg.com;");
    res.render("reset", {uuid: req.user.id, url: APP_URL })
})


router.post("/", [validationPasswordReset],async (req, res) =>{
    const {current_password,new_password,uuid} = req.body
    const passwordSuccess = await checkingPasswordMatch({password: current_password, uuid})
    if(!passwordSuccess) return res.send({"message": "Password incorrect"})
    const status = await savePassword({currentPassword: new_password, uuid})
    if(!status) return res.send({"message": "Password couldn't updated yet"})
    res.send({"message": "Password updated successfully"})
})

module.exports = router;