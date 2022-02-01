const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const {
  signup,
  forgotPassword,
  checkUserIfExistAndDelete,
  checkUserIfExistAndEdit,
} = require("../logic/user.logic");
const {
  checkUserDetails,
  checkIfUserActive,
  checkUserEmail,
} = require("../middleware/user.valiation");
const { loginVerifyToken } = require("../middleware/jwt");
const { showUserInfo } = require("../transaction/user.transaction");

const { RATE_LIMIT } = require("../config");

// add rate limit
const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: parseInt(RATE_LIMIT),
  message: "Too many request from this IP, please try again after an hour",
});

router.post("/register", [checkUserDetails], async (req, res) => {
  const { username, email } = req.body;
  const state = await signup({ mail: email, name: username });
  res.send(state);
});

router.post("/login", [createAccountLimiter, checkIfUserActive], (req, res) => {
  res.send({ token: req.body.token });
});

router.post("/forgot", checkUserEmail, async (req, res) => {
  const { email, uuid } = req.user;
  const state = await forgotPassword({ email, uuid });
  return res.status(200).send(state);
});

router.get("/profile", loginVerifyToken, async (req, res) => {
  const { uuid } = req.user;
  const { email, date, username, status } = await showUserInfo({ uuid });
  return res.send({ email, date, username, status });
});

// # add update router for user
// router.put("/update", loginVerifyToken, async (req, res) => {
//   const { uuid } = req.user;
//   const { email, password, } = req.body;
//   const result = await checkUserIfExistAndEdit({ email, password, uuid });
//   res.send(result);
// });

// # add delete router for user
router.delete("/", loginVerifyToken, async (req, res) => {
  const { uuid } = req.user;
  const result = await checkUserIfExistAndDelete({ uuid });
  return res.send(result);
});

module.exports = router;
