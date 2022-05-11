const mongoose = require("mongoose");
const reviewSchema = mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    roomid: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const reviewModel = mongoose.model("reviews", reviewSchema);
module.exports = reviewModel;
