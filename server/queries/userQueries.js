const GET_ALL_USERS = `
MATCH (u:User)
RETURN u
ORDER BY u.name
`;

const GET_USER_BY_ID = `
MATCH (u:User {id:$id})
RETURN u
`;

const CREATE_USER = `
CREATE (u:User{
    id:$id,
    name:$name,
    email:$email,
    experience:$experience
})
RETURN u
`;

const UPDATE_USER = `
MATCH (u:User {id:$id})
SET
u.name=$name,
u.email=$email,
u.experience=$experience
RETURN u
`;

const DELETE_USER = `
MATCH (u:User {id:$id})
DETACH DELETE u
`;

const GET_NEXT_ID = `
MATCH (u:User)
RETURN COALESCE(MAX(u.id),0)+1 AS nextId
`;

module.exports = {
    GET_ALL_USERS,
    GET_USER_BY_ID,
    CREATE_USER,
    UPDATE_USER,
    DELETE_USER,
    GET_NEXT_ID
};