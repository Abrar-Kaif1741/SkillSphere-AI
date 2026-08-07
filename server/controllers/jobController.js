const driver = require("../config/db");

exports.getAllJobs = async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run(`
      MATCH (j:Job)
      RETURN j
      ORDER BY j.title
    `);

    const jobs = result.records.map((record) => {
      const job = record.get("j").properties;

      return {
        id: Number(job.id),
        title: job.title,
        salary: job.salary,
        location: job.location,
      };
    });

    res.json({
      success: true,
      count: jobs.length,
      jobs,
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