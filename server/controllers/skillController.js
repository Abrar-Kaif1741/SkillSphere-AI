const driver = require("../config/db");

exports.getAllSkills = async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run(`
      MATCH (s:Skill)
      RETURN s
      ORDER BY s.name
    `);

    const skills = result.records.map((record) => {
      const skill = record.get("s").properties;

      return {
        id: Number(skill.id),
        name: skill.name,
        category: skill.category,
      };
    });

    res.json({
      success: true,
      count: skills.length,
      skills,
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