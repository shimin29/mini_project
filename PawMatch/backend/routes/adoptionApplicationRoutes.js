const express = require("express");

const { createAdoptionApplication, getMyAdoptionApplications, getAllAdoptionApplications, approveAdoptionApplication, rejectAdoptionApplication, getPendingAdoptionApplicationCount } = require("../controllers/adoptionApplicationController");

const { authenticate, requireAdmin } = require("../middlewares/auth");

const router = express.Router();

// User
router.post("/", authenticate, createAdoptionApplication);
router.get("/my", authenticate, getMyAdoptionApplications);
// Admin - get all application to see require
router.get("/", authenticate, requireAdmin, getAllAdoptionApplications);
router.get("/count", authenticate, requireAdmin, getPendingAdoptionApplicationCount);
// Admin - approve application
router.put("/:id/approve", authenticate, requireAdmin, approveAdoptionApplication);
// Admin - reject application
router.put("/:id/reject", authenticate, requireAdmin, rejectAdoptionApplication);

module.exports = router;
