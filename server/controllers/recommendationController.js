const RecommendationService = require("../services/recommendationService");

exports.getRecommendations = async (req, res) => {
  try {
    const data = await RecommendationService.getJobRecommendations(
      req.params.userId
    );

    res.json({
      success: true,
      count: data.length,
      recommendations: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getMissingSkills = async (req, res) => {
  try {
    const data = await RecommendationService.getMissingSkills(
      req.params.userId,
      req.params.jobId
    );

    res.json({
      success: true,
      count: data.length,
      missingSkills: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getCourseRecommendations = async (req, res) => {
  try {
    const data = await RecommendationService.getCourseRecommendations(
      req.params.userId
    );

    res.json({
      success: true,
      count: data.length,
      courses: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getSimilarUsers = async (req, res) => {
  try {
    const data = await RecommendationService.getSimilarUsers(
      req.params.userId
    );

    res.json({
      success: true,
      count: data.length,
      users: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getCareerPath = async (req, res) => {
  try {
    const data = await RecommendationService.getCareerPath(
      req.params.userId
    );

    res.json({
      success: true,
      count: data.length,
      path: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};