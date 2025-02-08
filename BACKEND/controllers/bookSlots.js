const eventModel = require("../models/eventModel");
const userModel = require("../models/userModel");

module.exports.bookSlots = async (req, res, io) => {
  try {
    const { userid, eventid } = req.body;
    let user = await userModel.findOne({ _id: userid });

    if (!user.guest) {
      console.log("organizers cannot book slots");
      return res.status(400).console.log("not guest");
    }

    let updatedEvent = await eventModel.findOneAndUpdate(
      { _id: eventid },
      { $push: { guests: user._id } },
      { new: true }
    );
    console.log("booked slot");
    const bookedSlots = updatedEvent.guests.length;
    console.log(bookedSlots);
    io.emit("updatedBookedSlots", bookedSlots);
    return res.status(200).send("booked slots");
  } catch (err) {
    console.log("something went wrong while booking slots", err.message);
    return res.status(400).send(err.message);
  }
};
