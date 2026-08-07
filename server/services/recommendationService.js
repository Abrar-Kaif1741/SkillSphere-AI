const driver = require("../config/db");

const {
  GET_JOB_RECOMMENDATIONS,
  GET_MISSING_SKILLS,
  GET_COURSE_RECOMMENDATIONS,
  GET_SIMILAR_USERS,
  GET_CAREER_PATH,
} = require("../queries/cypherQueries");

class RecommendationService {

  static async getJobRecommendations(userId) {
    const session = driver.session();

    try {
      const result = await session.run(
        GET_JOB_RECOMMENDATIONS,
        {
          userId: Number(userId),
        }
      );

      return result.records.map((record) => ({
        job: record.get("job"),
        salary: record.get("salary"),
        location: record.get("location"),
        company: record.get("company"),
      }));
    } finally {
      await session.close();
    }
  }

  static async getMissingSkills(userId, jobId) {
    const session = driver.session();

    try {
      const result = await session.run(
        GET_MISSING_SKILLS,
        {
          userId: Number(userId),
          jobId: Number(jobId),
        }
      );

      return result.records.map((record) => ({
        skill: record.get("skill"),
      }));
    } finally {
      await session.close();
    }
  }

  static async getCourseRecommendations(userId) {
    const session = driver.session();

    try {
      const result = await session.run(
        GET_COURSE_RECOMMENDATIONS,
        {
          userId: Number(userId),
        }
      );

      return result.records.map((record) => ({
        course: record.get("course"),
        platform: record.get("platform"),
        skill: record.get("skill"),
      }));
    } finally {
      await session.close();
    }
  }

  static async getSimilarUsers(userId) {
    const session = driver.session();

    try {
      const result = await session.run(
        GET_SIMILAR_USERS,
        {
          userId: Number(userId),
        }
      );

      return result.records.map((record) => ({
        user: record.get("user"),
        commonSkills: Number(record.get("commonSkills")),
      }));
    } finally {
      await session.close();
    }
  }

  static async getCareerPath(userId) {
    const session = driver.session();

    try {
      const result = await session.run(
        GET_CAREER_PATH,
        {
          userId: Number(userId),
        }
      );

      return result.records.map((record) => ({
        user: record.get("user"),
        skill: record.get("skill"),
        job: record.get("job"),
        company: record.get("company"),
      }));
    } finally {
      await session.close();
    }
  }

}

module.exports = RecommendationService;