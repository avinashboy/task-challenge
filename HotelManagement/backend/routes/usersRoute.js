const express = require("express");
const router = express.Router();
const User = require("../models/user");
router.post("/register", async (req, res) => {
  const newuser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const user = await newuser.save();
    res.send("Useer Registered Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email, password: password });
    if (user) {
      return res.send(user);
    } else {
      return res.status(400).json({ message: "Login failed" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.delete("/deleteuser/:id", async (req, res) => {
  const id = req.params.id;
  if (!id.match(/^[0-9a-fA-F]{24}$/))
    return res.status(404).send({ message: "Not found" });

  const food = await User.findOne({ _id: id });
  if (!food) return res.status(404).send({ message: "Not found" });
  try {
    await User.deleteOne({ _id: id });
    return res.status(200).send("Deleted Successfully");
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Something happened try again later" });
  }
});
module.exports = router;
