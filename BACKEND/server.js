const cookieParser = require("cookie-parser");
const express = require("express");
const http = require("http");
const app = express();
const socketIo = require("socket.io");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const eventRouter = require("./routes/eventRoutes");
const { bookSlots } = require("./controllers/bookSlots");

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "https://event-management-web-app-theta.vercel.app/",
    credentials: true,
  },
});
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "https://event-management-web-app-theta.vercel.app/",
    credentials: true,
  })
);

app.use("/user", userRouter);
app.use("/events", eventRouter);

app.post("/bookSlots", function (req, res) {
  bookSlots(req, res, io);
});
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("bookSlot", () => {
    console.log(`Slot booked by: ${socket.id}`);
    io.emit("updateSlots", "A new slot was booked!");
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(3000, console.log("server is running on port 3000"));
