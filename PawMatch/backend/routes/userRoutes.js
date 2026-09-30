const express = require("express");

const { register, login, getAllUsers, deleteUser } = require("../controllers/userController");

const { authenticate, requireAdmin } = require("../middlewares/auth");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

// Admin only
router.get("/", authenticate, requireAdmin, getAllUsers);

router.delete("/:id", authenticate, requireAdmin, deleteUser);

module.exports = router;
