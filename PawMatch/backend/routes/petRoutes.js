const express = require("express");

const { getAllPets, getPetById, addNewPet, updatePet, deletePet, getPetCount } = require("../controllers/petController");

const { authenticate, requireAdmin } = require("../middlewares/auth");

const router = express.Router();


router.get("/count", authenticate, requireAdmin, getPetCount);

// Get all pets
router.get("/", getAllPets);

// Get one pet
router.get("/:id", getPetById);

// Admin: Add pet
router.post("/", authenticate, requireAdmin, addNewPet);

// Admin: Update pet
router.put("/:id", authenticate, requireAdmin, updatePet);

// Admin: Delete pet
router.delete("/:id", authenticate, requireAdmin, deletePet);

module.exports = router;
