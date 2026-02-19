require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/techchat")
  .then(() => console.log("✓ MongoDB Connected"))
  .catch(err => {
    console.error("✗ MongoDB Connection Error:", err.message);
    process.exit(1);
  });

// Routes
try {
  app.use("/api/questions", require("./src/routes/questionRoutes"));
  app.use("/api/stories", require("./src/routes/storyRoutes"));
  console.log("✓ Routes loaded successfully");
} catch (err) {
  console.error("✗ Error loading routes:", err.message);
  process.exit(1);
}

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Socket.IO Events
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("newQuestion", (data) => socket.broadcast.emit("questionAdded", data));
  socket.on("newAnswer", (data) => socket.broadcast.emit("answerAdded", data));
  socket.on("newStory", (data) => socket.broadcast.emit("storyAdded", data));

  socket.on("disconnect", () => console.log("User disconnected:", socket.id));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
});