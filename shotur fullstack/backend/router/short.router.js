const express = require("express");
const router = express.Router();
const { loginVerifyToken } = require("../middleware/jwt");
const shortModels = require("../models/short.models");
const { APP_URL } = require("../config");
const { isUrl, cleanEscape, cleanUnescape } = require("../helper");
const shortid = require("shortid");


router.get("/", loginVerifyToken, async (req, res) => {
  const short = await shortModels.find({ uuid: req.user.uuid }).sort({"createdAt": -1});
  if (!short) return res.status(404).send({ message: "No record" });

  const array = []
  short.forEach( (record) => {
    const {_id : id, fullurl: url, count, location: country, createdAt: created, shortcode: short, deviceType: device} = record
    const load = {id, url: cleanUnescape(url), short: `${APP_URL}${short}`, metadata:{count, device,country,created}}
    array.push(load)
  })
  return res.send(array);
});

router.post("/", loginVerifyToken, async (req, res) => {
  const { uuid } = req.user;
  const { fullUrl } = req.body;
  const shortcode = shortid.generate();

  if (!isUrl(fullUrl))
    return res.status(400).send({ message: "Not a valid URL" });
  const cleanUrl = cleanEscape(fullUrl);
  try {
    const shortSave = new shortModels({
      uuid,
      fullurl: cleanUrl,
      shortcode,
    });

    await shortSave.save();
    return res.status(201).send({ message: "Successful created URL" });
  } catch (error) {
    console.log("error:", error);
    return res.send({ message: error.message });
  }
});


router.delete("/:id", loginVerifyToken, async (req, res) => {
  const short = await shortModels.findOne({ _id: req.params.id });
  if (!short) return res.status(404).send({ message: "No record" });
  try {
    await shortModels.deleteOne({_id: req.params.id})
    return res.status(200).send({message: true})
  } catch (error) {
    return res.status(400).send({ message: "Something happened try again later" });
  }
})

module.exports = router;
