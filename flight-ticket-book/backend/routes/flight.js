const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const shortid = require("shortid");
const { Payment } = require("../models/data");
const dotenv = require("dotenv");
dotenv.config();

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
const SECRET_KEY = process.env.SECRET_KEY;

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

router.get("/", (req, res, next) => {
  res.send("okay");
});

router.post("/payment", async (req, res, next) => {
  const { price, adult, children, way } = req.body;
  const amount = Math.round(price * adult + (price * children) / 2);
  const totalAmount = way ? amount * 2 * 100 : amount * 100;

  const options = {
    amount: totalAmount,
    currency: "INR",
    receipt: shortid.generate(),
    payment: {
      capture: "automatic",
      capture_options: {
        automatic_expiry_period: 12,
        manual_expiry_period: 7200,
        refund_speed: "optimum",
      },
    },
  };

  try {
    const response = await razorpay.orders.create(options);

    const { id, amount, currency } = response;
    const paymentSave = new Payment({ orderId: id });
    await paymentSave.save();
    return res.status(200).send({ id, amount, currency });
  } catch (error) {
    console.log("error:", error);
    return res.status(400).send({ message: "Something went wrong" });
  }
});

router.post("/verification", async (req, res, next) => {
  const crypto = require("crypto");
  const expectedSignature = crypto
    .createHmac("sha256", SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest("hex");
  if (expectedSignature === req.headers["x-razorpay-signature"]) {
    const orderId = req.body.payload.payment.entity.order_id;
    const payId = req.body.payload.payment.entity.id;
    try {
      await Payment.updateOne(
        { orderId },
        { metaInfo: { payId, success: true } }
      );
    } catch (error) {
      console.log("error:", error);
    }
  }

  res.json({ status: "ok" });
});

router.post("/checking", async (req, res, next) => {
  const { paymentId, orderId } = req.body;

  const check = await Payment.findOne({ orderId });

  if (check.metaInfo.payId === paymentId)
    return res.status(200).send({ success: check.metaInfo.success });
  res.status(400).send({ message: "Not found" });
});

module.exports = router;
