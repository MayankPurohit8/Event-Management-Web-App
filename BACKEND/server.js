const cookieParser = require("cookie-parser");
const express = require("express");
const http = require("http");
const app = express();
const socketIo = require("socket.io");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const eventRouter = require("./routes/eventRoutes");
const { bookSlots } = require("./controllers/bookSlots");

// Create server with http and socket.io (if you're using socket.io)
const server = http.createServer(app);
const io = socketIo(server);

// CORS setup for allowing your frontend origin and credentials
const allowedOrigins = [
  "https://event-management-web-app-theta.vercel.app", // Production frontend
  "http://localhost:5173", // Local dev frontend (for testing with Vite)
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow request
      } else {
        callback(new Error("Not allowed by CORS")); // Reject request
      }
    },
    methods: "GET,POST,PUT,DELETE,OPTIONS", // Allowed HTTP methods
    credentials: true, // Allow cookies and credentials
  })
);

// Preflight request handler for all routes
app.options("*", cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Basic route for testing the backend
app.get("/", function (req, res) {
  res.send("Backend is working correctly");
  console.log("Backend is online");
});

// Routes
app.use("/user", userRouter);
app.use("/events", eventRouter);

// Your slot booking route
app.post("/book-slots", bookSlots);

// Start server (listening for requests)
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
