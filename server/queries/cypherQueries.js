const GET_JOB_RECOMMENDATIONS = `
MATCH (u:User {id:$userId})-[:HAS_SKILL]->(s:Skill)
MATCH (s)-[:REQUIRED_FOR]->(j:Job)
MATCH (j)-[:OFFERED_BY]->(c:Company)

RETURN DISTINCT
j.title AS job,
j.salary AS salary,
j.location AS location,
c.name AS company

ORDER BY job
`;

const GET_MISSING_SKILLS = `
MATCH (u:User {id:$userId})
MATCH (j:Job {id:$jobId})

MATCH (j)<-[:REQUIRED_FOR]-(required:Skill)

WHERE NOT EXISTS{
MATCH (u)-[:HAS_SKILL]->(required)
}

RETURN required.name AS skill
ORDER BY skill
`;

const GET_COURSE_RECOMMENDATIONS = `
MATCH (u:User {id:$userId})
MATCH (required:Skill)<-[:TEACHES]-(course:Course)

WHERE NOT EXISTS{
MATCH (u)-[:HAS_SKILL]->(required)
}

RETURN DISTINCT
course.title AS course,
course.platform AS platform,
required.name AS skill
ORDER BY course
`;

const GET_SIMILAR_USERS = `
MATCH (u:User {id:$userId})-[:HAS_SKILL]->(s:Skill)
MATCH (other:User)-[:HAS_SKILL]->(s)

WHERE other.id <> $userId

RETURN
other.name AS user,
COUNT(s) AS commonSkills

ORDER BY commonSkills DESC
`;

const GET_CAREER_PATH = `
MATCH (u:User {id:$userId})
-[:HAS_SKILL]->
(skill:Skill)
-[:REQUIRED_FOR]->
(job:Job)
-[:OFFERED_BY]->
(company:Company)

RETURN
u.name AS user,
skill.name AS skill,
job.title AS job,
company.name AS company
`;

module.exports = {
GET_JOB_RECOMMENDATIONS,
GET_MISSING_SKILLS,
GET_COURSE_RECOMMENDATIONS,
GET_SIMILAR_USERS,
GET_CAREER_PATH
};