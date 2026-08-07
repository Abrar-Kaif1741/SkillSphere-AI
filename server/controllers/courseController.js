const driver = require("../config/db");

exports.getAllCourses = async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run(`
      MATCH (c:Course)
      RETURN c
      ORDER BY c.title
    `);

    const courses = result.records.map((record) => {
      const course = record.get("c").properties;

      return {
        id: Number(course.id),
        title: course.title,
        platform: course.platform,
      };
    });

    res.json({
      success: true,
      count: courses.length,
      courses,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  } finally {
    await session.close();
  }
};