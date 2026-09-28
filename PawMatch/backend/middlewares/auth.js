const jwt = require("jsonwebtoken");

const User = require("../models/User");

const JWT_SECRET_KEY = "my_test_secret_key";

exports.authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                message: "No token provided",
            });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        const user = await User.findOne({
            email: decoded.email,
        });
        if (!user) {
            return res.status(401).json({
                message: "User not found",
            });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            message: "Invalid or expired token",
        });
    }
};
