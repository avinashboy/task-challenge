const mongoose = require("mongoose");
const foodSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    type: { type: String, required: true },
    method: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const foodModel = mongoose.model("foods", foodSchema);
module.exports = foodModel;
