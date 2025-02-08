const eventModel = require("../models/eventModel");

module.exports.getEvents = async (req, res) => {
  try {
    let events = await eventModel.find();
    return res.status(200).json({ events });
  } catch (err) {
    return res.status(400).send("somrthing went wrong");
  }
};

module.exports.deleteEvent = async (req, res) => {
  try {
    let event = await eventModel.findOneAndDelete({ _id: req.body.id });
    return res.status(200).send("deleted");
  } catch (err) {}
};

module.exports.updateEvent = async (req, res) => {
  console.log("reached backend");
  const { title, description, time, date, location, id } = req.body;
  console.log("got data");
  try {
    let result = await eventModel.findOneAndUpdate(
      { _id: id },
      { title, description, time, date, location }
    );
    console.log("event updated");
    return res.status(200).send("event updated");
  } catch (err) {
    console.log(err.message);
    return res.status(404).send("something went wrong");
  }
};
