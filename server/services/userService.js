console.log("✅ NEW USER CONTROLLER LOADED");

const UserService = require("../services/userService");

// =========================
// GET ALL USERS
// =========================
exports.getAllUsers = async (req, res) => {
    try {

        console.log("✅ getAllUsers controller called");

        const users = await UserService.getAllUsers();

        console.log("Users Returned:", users);

        return res.status(200).json({
            success: true,
            count: users.length,
            users
        });

    } catch (err) {

        console.error("❌ getAllUsers Error:", err);

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

// =========================
// GET USER BY ID
// =========================
exports.getUserById = async (req, res) => {
    try {

        console.log("✅ getUserById:", req.params.id);

        const user = await UserService.getUserById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            user
        });

    } catch (err) {

        console.error("❌ getUserById Error:", err);

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

// =========================
// CREATE USER
// =========================
exports.createUser = async (req, res) => {
    try {

        console.log("✅ createUser called");

        const { name, email, experience } = req.body;

        if (!name || !email || !experience) {

            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });

        }

        const user = await UserService.createUser({
            name,
            email,
            experience
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user
        });

    } catch (err) {

        console.error("❌ createUser Error:", err);

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

// =========================
// UPDATE USER
// =========================
exports.updateUser = async (req, res) => {
    try {

        console.log("✅ updateUser:", req.params.id);

        const { name, email, experience } = req.body;

        const user = await UserService.updateUser(
            req.params.id,
            {
                name,
                email,
                experience
            }
        );

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            user
        });

    } catch (err) {

        console.error("❌ updateUser Error:", err);

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

// =========================
// DELETE USER
// =========================
exports.deleteUser = async (req, res) => {
    try {

        console.log("✅ deleteUser:", req.params.id);

        await UserService.deleteUser(req.params.id);

        return res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (err) {

        console.error("❌ deleteUser Error:", err);

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};