const express = require("express");
const { getEvents, deleteEvent, updateEvent } = require("../utils/getEvents");
const router = express.Router();

router.get("/getEvents", getEvents);
router.post("/updateEvent", updateEvent);
router.post("/deleteEvent", deleteEvent);

module.exports = router;
