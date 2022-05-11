const mongoose = require("mongoose");
const formsSchema = mongoose.Schema({
  roomname: {
    type: String,
    required: true,
  },
  roomid: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  usermessage: {
    type: String,
    required: true,
  },
  userimage: {
    type: "String",
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const fromsmodel = mongoose.model("froms", formsSchema);
module.exports = fromsmodel;
