const express = require("express");
const router = express.Router();
const Froms = require("../models/froms");
const { ref, deleteObject } = require("firebase/storage");
const { storage } = require("../utils/firebase");

router.get("/getfroms", async (req, res) => {
  try {
    const forms = await Froms.find();
    res.json(forms);
  } catch (error) {
    res.send("Not found");
  }
});

router.get("/getfroms/:id", async (req, res) => {
  const id = await req.params.id;
  if (!id.match(/^[0-9a-fA-F]{24}$/))
    return res.status(404).send({ message: "Not found" });
  try {
    const forms = await Froms.findOne({ _id: id });
    res.json(forms);
  } catch (error) {
    res.send("Not found");
  }
});

router.post("/getfromsstatusbyuserid", async (req, res) => {
  const id = await req.body.userid;
  if (!id.match(/^[0-9a-fA-F]{24}$/))
    return res.status(404).send({ message: "Not found" });
  try {
    const fromsStatus = await Froms.find({ userid: id });
    res.send(fromsStatus);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/addfroms", async (req, res) => {
  const { roomname, roomid, userid, username, usermessage, userimage } =
    req.body;
  const newFroms = new Froms({
    roomname,
    roomid,
    userid,
    username,
    usermessage,
    userimage,
  });
  try {
    await newFroms.save();
    res.send("Add food successfull");
  } catch (error) {
    console.log("error:", error);
    res.status(400).send("Froms can't be added");
  }
});

router.put("/updateUserStatus/:id", async (req, res) => {
  const id = req.params.id;
  if (!id.match(/^[0-9a-fA-F]{24}$/))
    return res.status(404).send({ message: "Not found" });
  const froms = await Froms.findOne({ _id: id });
  if (!froms) return res.status(404).send({ message: "Not found" });
  const { type } = req.body;
  try {
    froms.status = type;
    await froms.save();
    res.send("Update successfull");
  } catch (error) {
    console.log("error:", error);
    res.status(400).send("Froms can't be added");
  }
});

router.delete("/deletefroms/:id", async (req, res) => {
  const id = req.params.id;
  if (!id.match(/^[0-9a-fA-F]{24}$/))
    return res.status(404).send({ message: "Not found" });

  const froms = await Froms.findOne({ _id: id });
  if (!froms) return res.status(404).send({ message: "Not found" });
  try {
    const desertRef = ref(storage, froms.userimage);
    deleteObject(desertRef)
      .then(() => {
        console.log("File deleted successfully:");
      })
      .catch((error) => {
        console.log("error:", error.code);
      });

    await Froms.deleteOne({ _id: id });
    return res.status(200).send("Deleted Successfully");
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Something happened try again later" });
  }
});

module.exports = router;
