const eventModel = require("../models/eventModel");

module.exports.postEvents = async (req, res) => {
  try {
    const { title, description, time, date, location, id } = req.body;

    let event = await eventModel.findOne({
      time: time,
      date: date,
      location: location,
      organizer: id,
    });

    if (event) {
      console.log("event already exists");
      return res.status(400).send("event already exists");
    }

    let newEvent = await eventModel.create({
      title,
      description,
      time,
      date,
      location,
      organizer: id,
    });
    console.log("event created sucessfully");
    return res.status(200).send("event created sucessfully");
  } catch (err) {
    console.log("something went wrong while creating event");
    return res.status(400).send("something went wrong while creating event");
  }
};
