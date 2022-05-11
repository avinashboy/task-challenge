const express = require("express");
const router = express.Router();
const Food = require("../models/food");
const FoodBookingModel = require("../models/foodBooking");
const { STRIPE_SECRET_KEY } = require("../config");
const stripe = require("stripe")(STRIPE_SECRET_KEY);
const { makeid } = require("../utils");
const { v4: uuidv4 } = require("uuid");
const { ref, deleteObject } = require("firebase/storage");
const { storage } = require("../utils/firebase");

router.get("/getfoods", async (req, res) => {
  try {
    let payLoad = [];
    const foods = await Food.find().sort({ createdAt: -1 });
    foods.map((food) => {
      payLoad.push({
        name: food.name,
        type: food.type,
        price: food.price,
        image: food.image,
        id: food._id,
      });
    });
    res.json(payLoad);
  } catch (error) {
    res.send("Not found");
  }
});

router.get("/orderfoods", async (req, res) => {
  try {
    const foods = await FoodBookingModel.find();
    res.json(foods);
  } catch (error) {
    res.send("Not found");
  }
});

router.get("/getfoodbookingsbyuserid/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const foodBooking = await FoodBookingModel.find({ userid: id });
    res.send(foodBooking);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/addfood", async (req, res) => {
  const { name, price, image, type, method } = req.body;
  const newFood = new Food({
    name,
    price,
    image,
    type,
    method,
  });
  try {
    await newFood.save();
    res.send("Add food successfull");
  } catch (error) {
    console.log("error:", error);
    res.send("Food can not be added");
  }
});

router.post("/foodpayment", async (req, res) => {
  const { foodList, totalAmount, userid, token, roomid } = req.body;
  const [id, name] = roomid.split("///");
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: totalAmount * 100,
        customer: customer.id,
        currency: "usd",
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      const newFoodBooking = new FoodBookingModel({
        foodList,
        totalAmount,
        transactionId: makeid(9),
        userid,
        roomid: id,
        roomname: name,
      });
      await newFoodBooking.save();
    }
    res.send("Payment Successfull, Your Food is Booked");
  } catch (error) {
    console.log("error:", error);
    return res.status(400).json({ error });
  }
});

router.delete("/deletefood/:id", async (req, res) => {
  const id = req.params.id;
  if (!id.match(/^[0-9a-fA-F]{24}$/))
    return res.status(404).send({ message: "Not found" });

  const food = await Food.findOne({ _id: id });
  if (!food) return res.status(404).send({ message: "Not found" });
  try {
    if (food.method === "file") {
      const desertRef = ref(storage, food.image);
      deleteObject(desertRef)
        .then(() => {
          console.log("File deleted successfully:");
        })
        .catch((error) => {
          console.log("error:", error.code);
        });
    }
    await Food.deleteOne({ _id: id });
    return res.status(200).send("Deleted Successfully");
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Something happened try again later" });
  }
});

module.exports = router;
