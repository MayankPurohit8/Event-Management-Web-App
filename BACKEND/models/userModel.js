const mongoose = require("mongoose");

mongoose.connect("");

const userModel = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  guest: { type: Boolean, default: false },
});

module.exports = mongoose.model("user", userModel);
