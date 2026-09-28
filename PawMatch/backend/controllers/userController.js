const User = require("../models/User");
const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = "my_test_secret_key";

// REGISTER
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required",
            });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already exists",
            });
        }

        // Create new user
        const user = new User({
            name,
            email,
            password,
            role: "user",
        });

        await user.save();

        res.status(201).json({
            message: "Registration successful",
        });

    } catch (error) {
        console.error("Register Error:", error);

        res.status(500).json({
            message: "Registration failed",
            error: error.message,
        });
    }
};

// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check required fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        // Compare password
        const isMatch = user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        // Create JWT
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role,
            },
            JWT_SECRET_KEY,
            {
                expiresIn: "24h",
            }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        console.error("Login Error:", error);

        res.status(500).json({
            message: "Login failed",
            error: error.message,
        });
    }
};

