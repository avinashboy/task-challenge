const mongoose = require("mongoose");

const trackerSchema = mongoose.Schema({
  uuid: { type: String, require: true },
  type: { type: String, require: true },
  category: { type: String, require: true },
  subCategory: { type: String, require: true },
  cost: { type: String, require: true },
  description: { type: String, require: true },
  date: { type: Date, require: true},
});

module.exports = mongoose.model("tracker", trackerSchema);
