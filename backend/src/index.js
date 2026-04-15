require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { checkDatabaseConnection } = require("./db");
const authRoutes = require("./routes/auth");
const electionRoutes = require("./routes/election");

const app = express();

function parseCsv(value = "") {
  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function compileOriginPatterns(values) {
  return values.flatMap((value) => {
    try {
      return [new RegExp(value)];
    } catch (error) {
      console.warn(`Ignoring invalid FRONTEND_URL_REGEX pattern: ${value}`);
      return [];
    }
  });
}

const allowedOrigins = parseCsv(process.env.FRONTEND_URL || "http://localhost:5173");
const allowedOriginPatterns = compileOriginPatterns(
  parseCsv(process.env.FRONTEND_URL_REGEX || "")
);
const localhostOriginPattern = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i;

function isAllowedOrigin(origin) {
  if (!origin) {
    return true;
  }

  if (allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
    return true;
  }

  if (allowedOriginPatterns.some((pattern) => pattern.test(origin))) {
    return true;
  }

  if (process.env.NODE_ENV !== "production" && localhostOriginPattern.test(origin)) {
    return true;
  }

  return false;
}

// Middleware
app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
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
