const driver = require("../config/db");

const {
  GET_ALL_USERS,
  GET_USER_BY_ID,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  GET_NEXT_ID,
} = require("../queries/userQueries");

// =========================
// GET ALL USERS
// =========================
const getAllUsers = async () => {
  const session = driver.session();

  try {
    const result = await session.run(GET_ALL_USERS);

    return result.records.map((record) => {
      const user = record.get("u");
      return user.properties;
    });
  } finally {
    await session.close();
  }
};

// =========================
// GET USER BY ID
// =========================
const getUserById = async (id) => {
  const session = driver.session();

  try {
    const result = await session.run(GET_USER_BY_ID, {
      id: Number(id),
    });

    if (result.records.length === 0) {
      return null;
    }

    const user = result.records[0].get("u");

    return user.properties;
  } finally {
    await session.close();
  }
};

// =========================
// CREATE USER
// =========================
const createUser = async ({ name, email, experience }) => {
  const session = driver.session();

  try {
    // Get next available ID
    const idResult = await session.run(GET_NEXT_ID);

    const nextId = Number(
      idResult.records[0].get("nextId")
    );

    // Create user in Neo4j
    const result = await session.run(CREATE_USER, {
      id: nextId,
      name,
      email,
      experience,
    });

    const user = result.records[0].get("u");

    return user.properties;
  } finally {
    await session.close();
  }
};

// =========================
// UPDATE USER
// =========================
const updateUser = async (
  id,
  { name, email, experience }
) => {
  const session = driver.session();

  try {
    const result = await session.run(UPDATE_USER, {
      id: Number(id),
      name,
      email,
      experience,
    });

    if (result.records.length === 0) {
      return null;
    }

    const user = result.records[0].get("u");

    return user.properties;
  } finally {
    await session.close();
  }
};

// =========================
// DELETE USER
// =========================
const deleteUser = async (id) => {
  const session = driver.session();

  try {
    await session.run(DELETE_USER, {
      id: Number(id),
    });

    return true;
  } finally {
    await session.close();
  }
};

// =========================
// EXPORT
// =========================
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};