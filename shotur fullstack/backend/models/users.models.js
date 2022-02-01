const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    uuid: {type: String, unique: true},
    email:{type: String, unique: true},
    password: String,
    status: {
      type: String, 
      enum: ['Pending', 'Active'],
      default: 'Pending'
    },
    confirmationCode: { 
      type: String, 
      unique: true },
    date: {
        type: Date,
        default: Date.now,
      },
})

module.exports = mongoose.model("user", userSchema)