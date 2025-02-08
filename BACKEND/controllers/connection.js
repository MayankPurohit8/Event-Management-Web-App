const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.MONGODB_URI;

mongooose
  .connect(uri)
  .then(() => {
    console.log("database connected");
  })
  .catch("Something went wrong wile connecting to database", err.message);
