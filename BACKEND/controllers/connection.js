const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGODB_URI;

/*mongoose
  .connect(uri)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) =>
    console.log(
      "Something went wrong while connecting to the database",
      err.message
    )
  );*/
