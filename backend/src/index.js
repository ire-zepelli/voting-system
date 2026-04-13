require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { checkDatabaseConnection } = require("./db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Environment variables
const PORT = process.env.PORT || 5000;

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Server is running.",
    endpoints: {
      api: "/api/test",
      database: "/api/health/db",
    },
  });
});

app.get("/api/test", (req, res) => {
  res.json({ success: true, message: "API works!" });
});

app.get("/api/health/db", async (req, res) => {
  try {
    const status = await checkDatabaseConnection();

    res.json({
      success: true,
      ...status,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database connection failed.",
      error: error.message,
    });
  }
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
