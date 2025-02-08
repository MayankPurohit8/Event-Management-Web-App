const express = require("express");
const { register, login, logout } = require("../controllers/auth");

const { postEvents, bookSlots } = require("../controllers/events");
const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.post("/postEvent", postEvents);

module.exports = router;
