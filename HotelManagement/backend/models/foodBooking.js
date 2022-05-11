const mongoose = require("mongoose");
const foodBookingSchema = mongoose.Schema({
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
  totalAmount: {
    type: Number,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
  foodList: {
    type: Array,
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
const foodBookingModel = mongoose.model("foodBooking", foodBookingSchema);
module.exports = foodBookingModel;
