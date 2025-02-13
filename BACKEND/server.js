const cookieParser = require("cookie-parser");
const express = require("express");
const http = require("http");
const app = express();
const socketIo = require("socket.io");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const eventRouter = require("./routes/eventRoutes");
const { bookSlots } = require("./controllers/bookSlots");

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/events", eventRouter);

app.listen(3000, console.log("server is running on port 3000"));
