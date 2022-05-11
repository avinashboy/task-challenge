const express = require("express");
const router = express.Router();
const Review = require("../models/review");

router.get("/getallreviews", async (req, res) => {
  try {
    const review = await Review.find({});
    res.send(review);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.get("/getroomreviewbyid/:roomid", async (req, res) => {
  const roomid = req.params.roomid;
  try {
    const review = await Review.find({ roomid });
    res.send(review);
  } catch (error) {
    console.log('error:', error)
    return res.status(400).json({ message: error });
  }
});

router.post("/addreview", async (req, res) => {
  try {
    const newReview = new Review(req.body);
    await newReview.save();
    res.send("Added Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.delete("/deletereview/:id", async (req, res) => {
  const id = req.params.id;

  if (!id.match(/^[0-9a-fA-F]{24}$/))
    return res.status(404).send({ message: "Not found" });
  const short = await Review.findOne({ _id: id });

  if (!short) return res.status(404).send({ message: "Not found" });

  try {
    await Review.deleteOne({ _id: id });
    return res.status(200).send("Deleted Successfully");
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Something happened try again later" });
  }
});
module.exports = router;
