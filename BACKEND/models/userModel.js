const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/eventApp");

const userModel = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  guest: { type: Boolean, default: false },
});

module.exports = mongoose.model("user", userModel);
