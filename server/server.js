const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// ==========================
// Database
// ==========================
const driver = require("./config/db");

// Test Database Connection
driver
  .verifyConnectivity()
  .then(() => {
    console.log("✅ Neo4j Connected");
  })
  .catch((err) => {
    console.log("❌ Neo4j Connection Failed");
    console.error(err);
  });

// ==========================
// Middleware
// ==========================
app.use(cors());
app.use(express.json());

// ==========================
// Routes
// ==========================
const userRoutes = require("./routes/userRoutes");
const skillRoutes = require("./routes/skillRoutes");
const jobRoutes = require("./routes/jobRoutes");
const companyRoutes = require("./routes/companyRoutes");
const courseRoutes = require("./routes/courseRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");

app.use("/api/users", userRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/recommendations", recommendationRoutes);

// ==========================
// Home
// ==========================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    project: "SkillSphere AI",
    version: "1.0.0",
    message: "Backend Running 🚀",
  });
});

// ==========================
// Health Check
// ==========================
app.get("/health", async (req, res) => {
  try {
    await driver.verifyConnectivity();

    res.status(200).json({
      success: true,
      server: "Running",
      database: "Connected",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      server: "Running",
      database: "Disconnected",
      error: err.message,
    });
  }
});

// ==========================
// 404 Handler
// ==========================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ==========================
// Global Error Handler
// ==========================
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: err.message,
  });
});

// ==========================
// Start Server
// ==========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});