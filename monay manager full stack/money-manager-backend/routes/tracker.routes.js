var express = require("express");
var router = express.Router();
const {
  validatorData,
  verifyToken,
} = require("../middleware/tracker.middleware");
const { cleanEscape } = require("../helper");
const trackerModel = require("../models/track.models");
const createError = require("http-errors");
const moment = require("moment");
const { getHoursDiff } = require("../helper");

router.get("/between", [verifyToken], async (req, res, next) => {
  const { start, end, mode } = req.query;


  let one,
    two = null;
  const { user } = req.user;
  if (mode.toLowerCase() === "weekly") {
    one = moment(start).subtract(7, "days");
    two = moment(start).format();
  }
  if (mode.toLowerCase() === "monthly") {
    one = moment(start).subtract(1, "months");
    two = moment(start).format();
  }
  if (mode.toLowerCase() === "yearly") {
    one = moment(start).subtract(1, "years");
    two = moment(start).format();
  }
  if (mode.toLowerCase() === "twodate") {
    one = moment(start).format();
    two = moment(end).format();
  }

  try {
    const tracker = await trackerModel.find({
      $and: [{ uuid: user }, { date: { $gte: one, $lte: two } }],
    });
    one = two = null;
    return res.status(200).send(tracker);
  } catch (error) {
    console.log("error:", error);
    return res.status(400).send("Please try again later");
  }
});

router.get("/:id", [verifyToken], async (req, res, next) => {
  const id = req.params.id;
  try {
    const tracker = await trackerModel.findOne({ _id: id });
    return res.status(200).send(tracker);
  } catch (error) {
    console.log("error:", error);
    return res.status(400).send("Please try again later");
  }
});

router.get("/", [verifyToken], async (req, res, next) => {
  const { user } = req.user;
  try {
    const tracker = await trackerModel.find({ uuid: user });
    return res.status(200).send(tracker);
  } catch (error) {
    console.log("error:", error);
    return res.status(400).send("Please try again later");
  }
});

router.post("/", [validatorData, verifyToken], async (req, res, next) => {
  const { type, category, subCategory, cost, description, date } = req.body;
  const { user } = req.user;
  const trackerSave = new trackerModel({
    uuid: user,
    type: cleanEscape(type),
    category: cleanEscape(category),
    subCategory: cleanEscape(subCategory),
    cost: cleanEscape(cost),
    description: cleanEscape(description),
    date: cleanEscape(date),
  });
  try {
    await trackerSave.save();
    return res.status(201).send({ message: "Successful created" });
  } catch (error) {
    console.log("error:", error);
    return res.send(createError.BadRequest("Failed to create it"));
  }
});

router.put("/:id", [verifyToken], async (req, res, next) => {
  const id = req.params.id;
  const { user } = req.user;
  const { type, category, subCategory, cost, description, date, extraDate } =
    req.body;

  const data = await trackerModel.findOne({
    $and: [{ _id: id }, { uuid: user }],
  });
  if (!data) return res.send(createError.NotFound("Couldn't find it'"));

  const databaseTime = new Date(data.date);
  const currentTimeFormUser = new Date(extraDate);

  if (getHoursDiff(currentTimeFormUser, databaseTime) > 12)
    return res.send(createError.BadRequest("it couldn't be updated it"));

  try {
    await trackerModel.updateOne(
      { $and: [{ _id: id }, { uuid: user }] },
      {
        $set: {
          type: cleanEscape(type),
          category: cleanEscape(category),
          subCategory: cleanEscape(subCategory),
          cost: cleanEscape(cost),
          description: cleanEscape(description),
        },
      }
    );
    return res.status(201).send({ message: "Successful updated" });
  } catch (error) {
    console.log("error:", error);
    return res.send(createError.BadRequest("Failed to update it"));
  }
});

router.delete("/:id", [verifyToken], async (req, res, next) => {
  const { user } = req.user;
  const data = await trackerModel.findOne({
    $and: [{ _id: req.params.id }, { uuid: user }],
  });
  if (!data) return res.send(createError.NotFound("Couldn't find it'"));
  try {
    await trackerModel.deleteOne({ _id: req.params.id });
    return res.status(200).send({ success: "Successful deleted" });
  } catch (error) {
    return res.send(createError.BadRequest("Failed to delete it"));
  }
});

module.exports = router;
