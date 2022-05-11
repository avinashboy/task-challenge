const express = require("express");
const app = express();
const dbConfig = require("./db");
const roomsRoute = require("./routes/roomsRoute");
const usersRoute = require("./routes/usersRoute");
const bookingsRoute = require("./routes/bookingsRoute");
const foodRoute = require("./routes/foodRoute");
const reviewRoute = require("./routes/reviewRoute");
const fromsRoute = require("./routes/fromsRoute");
const cors = require("cors");
const helmet = require("helmet");

// const whitelist = ["http://localhost:4000", "http://localhost:5000"];
// var corsOptions = {
//     origin: function (origin, callback) {
//       console.log('origin:', origin)
//       if (whitelist.indexOf(origin) !== -1 ) {
//         callback(null, true)
//       } else {
//         callback(new Error('Not allowed by CORS'))
//       }
//     }
//   }

// port
const port = process.env.PORT || 5000;

// App usage
app.use(express.json());
app.use(cors());
app.use(helmet());

// Middleware
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// API routes
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);
app.use("/api/bookings", bookingsRoute);
app.use("/api/foods", foodRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/froms", fromsRoute);

 app.listen(port, () =>
  console.log("Node Server Started @", port)
);
