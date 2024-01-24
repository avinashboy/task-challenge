const express = require("express");
const cors = require("cors");
const toobusy = require("toobusy-js");
const helmet = require("helmet");
const hpp = require("hpp");
const mongoose = require("mongoose");

// server setup
const port = process.env.PORT || 3030;
const app = express();

const { DB_URL } = require("./config"); 


mongoose.connect(
  DB_URL,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log(`connect to the db`)
);

// add middleware
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(express.urlencoded({ extended: false, limit: "1kb" }));
app.use(express.json());

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("public"));

// add dos protection
app.use(function (req, res, next) {
  if (toobusy()) return res.status(503).send("Server Too Busy");
  next();
});

// add routers
const user = require("./router/user.router");
const short = require("./router/short.router");
const verify = require("./router/verify.router");
const forgot = require("./router/forgot.router");
const index = require("./router/index.router");

app.use("/user", user);
app.use("/short", short);
app.use("/forgot", forgot);
app.use("/verify", verify);
app.use("/", index);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
