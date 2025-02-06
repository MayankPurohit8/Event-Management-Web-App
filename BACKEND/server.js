const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", function (req, res) {
  res.send("hello");
});

app.listen(3000);
