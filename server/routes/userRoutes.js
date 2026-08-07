const express = require("express");

const router = express.Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/userController");

// GET All Users
router.get("/", getAllUsers);

// GET User by ID
router.get("/:id", getUserById);

// CREATE User
router.post("/", createUser);

// UPDATE User
router.put("/:id", updateUser);

// DELETE User
router.delete("/:id", deleteUser);

module.exports = router;