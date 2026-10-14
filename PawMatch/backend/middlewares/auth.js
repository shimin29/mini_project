const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET;

// AUTHENTICATE USER
exports.authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "No token provided",
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findOne({
            email: decoded.email,
            // 根据解码出来的 email，在数据库的 User 集合中查找该用户
        });

        if (!user) {
            return res.status(401).json({
                message: "User not found",
            });
        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
};

// ADMIN ONLY
exports.requireAdmin = (req, res, next) => {
    // 假设在调用 requireAdmin 之前，已经通过了 authenticate 中间件，因此 req.user 已存在
    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Admin access required",
        });
    }

    next();
    // 如果是管理员，放行允许操作
};
