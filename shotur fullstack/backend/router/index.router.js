const express = require("express");
const router = express.Router();
const { getUserInfoLocation, deviceType } = require("../function");
const shortModels = require("../models/short.models");
const { cleanUnescape } = require("../helper");

router.get("/", (req,res)=>{
  res.send("Hey i'm running")
})

router.get("/:short",[getUserInfoLocation, deviceType],async (req, res, next) => {
    const { country } = req.geo;
    const device = req.device;

    const shortId = req.params.short;
    const short = await shortModels.findOne({ shortcode: shortId });

    if (!short) return res.status(404).send({ message: "Not a found" });

    const { count, location, deviceType } = short;

    if (device)
      deviceType[device] = deviceType[device] ? deviceType[device] + 1 : 1;
    if (country)
      location[country] = location[country] ? location[country] + 1 : 1;

    // *console change to and
    if (device || country)
      await shortModels.updateOne(
        { shortcode: shortId },
        { location, count: count + 1, deviceType }
      );

    // res.send(cleanUnescape(short.fullurl));
    res.redirect(cleanUnescape(short.fullurl))
  }
);

module.exports = router;
