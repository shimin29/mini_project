const express = require("express");

const { getAllPets, addNewPet } = require("../controllers/petController");

const router = express.Router();

router.get("/", getAllPets);
router.post("/", addNewPet)

module.exports = router;
