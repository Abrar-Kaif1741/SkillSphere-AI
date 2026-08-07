const driver = require("../config/db");

async function seedDatabase() {
  const session = driver.session();

  try {
    console.log("🌱 Seeding database...");

    await driver.verifyConnectivity();

    await session.executeWrite(async (tx) => {

      // Delete everything first
      await tx.run(`
        MATCH (n)
        DETACH DELETE n
      `);

      // Create all nodes and relationships in ONE query
      await tx.run(`
        CREATE
          (u1:User {id:1,name:'Rohan',email:'rohan@gmail.com',experience:'1 Year'}),
          (u2:User {id:2,name:'Rahul',email:'rahul@gmail.com',experience:'2 Years'}),
          (u3:User {id:3,name:'Priya',email:'priya@gmail.com',experience:'3 Years'}),
          (u4:User {id:4,name:'Anjali',email:'anjali@gmail.com',experience:'Fresher'}),

          (python:Skill {id:1,name:'Python',category:'Programming'}),
          (sql:Skill {id:2,name:'SQL',category:'Database'}),
          (powerbi:Skill {id:3,name:'Power BI',category:'Analytics'}),
          (react:Skill {id:4,name:'React',category:'Frontend'}),
          (node:Skill {id:5,name:'Node.js',category:'Backend'}),
          (neo4j:Skill {id:6,name:'Neo4j',category:'Database'}),
          (docker:Skill {id:7,name:'Docker',category:'DevOps'}),

          (da:Job {id:1,title:'Data Analyst',salary:'8 LPA',location:'Hyderabad'}),
          (de:Job {id:2,title:'Data Engineer',salary:'15 LPA',location:'Bangalore'}),
          (fs:Job {id:3,title:'Full Stack Developer',salary:'12 LPA',location:'Pune'}),
          (ai:Job {id:4,title:'AI Engineer',salary:'18 LPA',location:'Remote'}),

          (google:Company {id:1,name:'Google',industry:'IT'}),
          (microsoft:Company {id:2,name:'Microsoft',industry:'IT'}),
          (amazon:Company {id:3,name:'Amazon',industry:'Cloud'}),
          (deloitte:Company {id:4,name:'Deloitte',industry:'Consulting'}),

          (c1:Course {id:1,title:'Python Bootcamp',platform:'Udemy'}),
          (c2:Course {id:2,title:'SQL Masterclass',platform:'Coursera'}),
          (c3:Course {id:3,title:'React Complete Guide',platform:'Udemy'}),
          (c4:Course {id:4,title:'Neo4j Fundamentals',platform:'Neo4j'}),

          (u1)-[:HAS_SKILL]->(python),
          (u1)-[:HAS_SKILL]->(sql),
          (u1)-[:HAS_SKILL]->(powerbi),

          (u2)-[:HAS_SKILL]->(react),
          (u2)-[:HAS_SKILL]->(node),

          (u3)-[:HAS_SKILL]->(python),
          (u3)-[:HAS_SKILL]->(neo4j),

          (u4)-[:HAS_SKILL]->(sql),

          (u1)-[:INTERESTED_IN]->(de),
          (u2)-[:INTERESTED_IN]->(fs),
          (u3)-[:INTERESTED_IN]->(ai),
          (u4)-[:INTERESTED_IN]->(da),

          (python)-[:REQUIRED_FOR]->(de),
          (sql)-[:REQUIRED_FOR]->(de),
          (powerbi)-[:REQUIRED_FOR]->(da),
          (react)-[:REQUIRED_FOR]->(fs),
          (node)-[:REQUIRED_FOR]->(fs),
          (neo4j)-[:REQUIRED_FOR]->(ai),

          (de)-[:OFFERED_BY]->(google),
          (da)-[:OFFERED_BY]->(deloitte),
          (fs)-[:OFFERED_BY]->(microsoft),
          (ai)-[:OFFERED_BY]->(amazon),

          (c1)-[:TEACHES]->(python),
          (c2)-[:TEACHES]->(sql),
          (c3)-[:TEACHES]->(react),
          (c4)-[:TEACHES]->(neo4j)
      `);

    });

    console.log("✅ Database seeded successfully!");

  } catch (err) {
    console.error("❌ Seed Error");
    console.error("Code:", err.code);
    console.error("Message:", err.message);
  } finally {
    await session.close();
    await driver.close();
  }
}

seedDatabase();