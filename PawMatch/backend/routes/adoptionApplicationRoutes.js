const express = require("express");

const { createAdoptionApplication, getMyAdoptionApplications, getAllAdoptionApplications } = require("../controllers/adoptionApplicationController");
const { authenticate, requireAdmin } = require("../middlewares/auth");

const router = express.Router();

router.post("/", authenticate, createAdoptionApplication);
router.get("/my", authenticate, getMyAdoptionApplications);
router.get("/", authenticate, requireAdmin, getAllAdoptionApplications);

module.exports = router;
