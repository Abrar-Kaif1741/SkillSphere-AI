const UserService = require("../services/userService");

// GET /api/users
exports.getAllUsers = async (req, res) => {
    try {

        const users = await UserService.getAllUsers();

        res.status(200).json({
            success: true,
            count: users.length,
            users
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

// GET /api/users/:id
exports.getUserById = async (req, res) => {
    try {

        const user = await UserService.getUserById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

// POST /api/users
exports.createUser = async (req, res) => {
    try {

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

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

// PUT /api/users/:id
exports.updateUser = async (req, res) => {
    try {

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

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

// DELETE /api/users/:id
exports.deleteUser = async (req, res) => {
    try {

        await UserService.deleteUser(req.params.id);

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};