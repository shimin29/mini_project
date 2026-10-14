const User = require("../models/User");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

// REGISTER
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required",
            });
        } // 如果缺少任意一项，返回 400（错误请求）

        // Check if email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already exists",
            });
        } // 如果邮箱已被使用，返回 409（资源冲突

        // Create new user
        const user = new User({
            name,
            email,
            password,
            role: "user", // 新注册用户默认角色为普通用户 "user"
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

        // Find user - 根据邮箱查找用户
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        } // 查无此人，返回 401（未授权）

        // Compare password - 校验密码
        const isMatch = user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
            }); // 密码不匹配，同样返回 401（故意提示同样的错误信息，防止恶意枚举邮箱）
        }

        // Create JWT
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role,
            },
            JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || "24h",
            },
        );
        // 返回成功响应，带上 Token 和用户简要信息（供前端保存到 localStorage）
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

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select("-password").sort({ createdAt: -1 });

        res.status(200).json(users);
    } catch (error) {
        console.error("Get All Users Error:", error);

        res.status(500).json({
            message: "Failed to get users",
        });
    }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        // Prevent deleting another admin - 权限保护规则
        if (user.role === "admin") {
            return res.status(403).json({
                message: "Admin users cannot be deleted",
            }); // 拒绝删除管理员账号，返回 403
        }

        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "User deleted successfully",
        });
    } catch (error) {
        console.error("Delete User Error:", error);

        res.status(500).json({
            message: "Failed to delete user",
        });
    }
};

// GET USER COUNT - 统计用户总数（供 Admin Dashboard 仪表盘使用）
exports.getUserCount = async (req, res) => {
    try {
        const count = await User.countDocuments();
        // 计算 users 集合中的记录总条数
        res.status(200).json({
            count,
        });
    } catch (error) {
        console.error("Get User Count Error:", error);

        res.status(500).json({
            message: "Failed to get user count",
        });
    }
};
