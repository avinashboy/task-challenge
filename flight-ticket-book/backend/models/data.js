const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
  orderId: { type: String, require: true },
  metaInfo: { type: Object, default: {} },
  date: {
    type: Date,
    default: Date.now,
  },
});

const payment = mongoose.model("payment", paymentSchema);

module.exports = { Payment: payment };
