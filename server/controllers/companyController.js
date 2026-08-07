const driver = require("../config/db");

exports.getAllCompanies = async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run(`
      MATCH (c:Company)
      RETURN c
      ORDER BY c.name
    `);

    const companies = result.records.map((record) => {
      const company = record.get("c").properties;

      return {
        id: Number(company.id),
        name: company.name,
        industry: company.industry,
      };
    });

    res.json({
      success: true,
      count: companies.length,
      companies,
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