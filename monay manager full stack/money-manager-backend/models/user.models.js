const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  uuid: { type: String, unique: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", userSchema);
