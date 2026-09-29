const express = require("express");

const { createPetSubmission, getAllPetSubmissions, approvePetSubmission, rejectPetSubmission } = require("../controllers/petSubmissionController");

const { authenticate, requireAdmin } = require("../middlewares/auth");

const router = express.Router();

// User submits own pet
router.post("/", authenticate, createPetSubmission);

// Admin gets all submissions
router.get("/", authenticate, requireAdmin, getAllPetSubmissions);

// Admin approves submission
router.put("/:id/approve", authenticate, requireAdmin, approvePetSubmission);

// Admin rejects submission
router.put("/:id/reject", authenticate, requireAdmin, rejectPetSubmission);

module.exports = router;
