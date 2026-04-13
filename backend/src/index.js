require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Environment variables
const PORT = process.env.PORT || 5000;

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Server is running 🚀" });
});

app.get("/api/test", (req, res) => {
  res.json({ success: true, message: "API works!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
