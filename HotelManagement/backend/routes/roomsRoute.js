const express = require("express");
const router = express.Router();
const Room = require("../models/room");
const { ref, deleteObject } = require("firebase/storage");
const { storage } = require("../utils/firebase");

router.get("/getallrooms", async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.send(rooms);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.get("/getroombyid/:roomid", async (req, res) => {
  const roomid = req.params.roomid;

  try {
    const room = await Room.findOne({ _id: roomid });
    res.send(room);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/addroom", async (req, res) => {
  try {
    const newroom = new Room(req.body);
    await newroom.save();
    res.send("New Room Added Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.delete("/deleteroom/:id", async (req, res) => {
  const id = req.params.id;

  if (!id.match(/^[0-9a-fA-F]{24}$/))
    return res.status(404).send({ message: "Not found" });
  const short = await Room.findOne({ _id: id });

  if (!short) return res.status(404).send({ message: "Not found" });

  try {
    if (short.method === "file") {
      short.imageurls.forEach((url) => {
        const desertRef = ref(storage, url);
        // await deleteObject(desertRef);
        deleteObject(desertRef)
          .then(() => {
            console.log("File deleted successfully:");
          })
          .catch((error) => {
            console.log("error:", error.code);
          });
      });
    }
    await Room.deleteOne({ _id: id });
    return res.status(200).send("Deleted Successfully");
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Something happened try again later" });
  }
});
module.exports = router;
