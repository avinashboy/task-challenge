const mongoose = require("mongoose");
const { DB_URL } = require("./config.js");
mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });
var connection = mongoose.connection;
connection.on("error", () => {
  console.log("Mongo DB Connecion failed");
});
connection.on("connected", () => {
  console.log("Mongo DB Connection Successful");
});
module.export = mongoose;
