const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/eventApp");

const eventModel = mongoose.Schema({
  title: String,
  description: String,
  location: { type: String, default: "Yet to be announced" },
  date: Date,
  time: String,
  guests: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

module.exports = mongoose.model("event", eventModel);
