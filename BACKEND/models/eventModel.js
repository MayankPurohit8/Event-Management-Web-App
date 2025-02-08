const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://purohitmayank35:WWtXBbFjf6weNLfJ@cluster0.b825t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/eventApp"
);
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
