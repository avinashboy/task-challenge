const mongoose = require("mongoose");

const shortSchema = mongoose.Schema({
  uuid: { type: String, require: true },
  fullurl: { type: String, require: true },
  shortcode: { type: String, require: true,  unique: true },
  location: { type: Object, default: {} },
  deviceType: { type: Object, default: {} },
  count: { type: Number, default: 0 },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
});

module.exports = mongoose.model("short", shortSchema);
