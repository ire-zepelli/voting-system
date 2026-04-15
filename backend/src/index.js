require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { checkDatabaseConnection } = require("./db");
const authRoutes = require("./routes/auth");
const electionRoutes = require("./routes/election");

const app = express();
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

// Middleware
app.use(
  cors({
    origin: allowedOrigins.length === 1 ? allowedOrigins[0] : allowedOrigins,
  })
);
app.use(express.json());

// Environment variables
const PORT = process.env.PORT || 5000;

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Server is running.",
    endpoints: {
      auth: "/api/auth/login",
      candidates: "/api/candidates",
      vote: "/api/votes",
      results: "/api/results",
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

app.use("/api/auth", authRoutes);
app.use("/api", electionRoutes);

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
