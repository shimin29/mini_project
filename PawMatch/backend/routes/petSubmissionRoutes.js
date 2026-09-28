const express = require("express");

const { createPetSubmission } = require("../controllers/petSubmissionController");

const { authenticate } = require("../middlewares/auth");

const router = express.Router();

router.post("/", authenticate, createPetSubmission);

module.exports = router;
