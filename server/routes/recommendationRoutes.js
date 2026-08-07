const express = require("express");
const router = express.Router();

console.log("✅ recommendationRoutes loaded");

// Test Route
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Recommendation Route Working 🚀",
  });
});

const recommendationController = require("../controllers/recommendationController");

// Job Recommendations
router.get("/jobs/:userId", recommendationController.getRecommendations);

// Missing Skills
router.get(
  "/missing-skills/:userId/:jobId",
  recommendationController.getMissingSkills
);

// Course Recommendations
router.get(
  "/courses/:userId",
  recommendationController.getCourseRecommendations
);

// Similar Users
router.get(
  "/similar-users/:userId",
  recommendationController.getSimilarUsers
);

// Career Path
router.get(
  "/career-path/:userId",
  recommendationController.getCareerPath
);

module.exports = router;