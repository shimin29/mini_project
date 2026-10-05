const Pet = require("../models/Pet");

// GET ALL PET
exports.getAllPets = async (req, res) => {
    try {
        const pets = await Pet.find({});
        res.status(200).json(pets);
    } catch (error) {
        console.error("Get Pets Error:", error);
        res.status(500).json({
            message: "Failed to get pets",
        });
    }
};

//GET PET BY ID
exports.getPetById = async (req, res) => {
    const pet = await Pet.findOne({ _id: req.params.id });
    res.json(pet);
};

// ADD NEW PET
exports.addNewPet = async (req, res) => {
    try {
        const { name, type, breed, age, gender, healthStatus, adoptionStatus, image, description } = req.body;
        if (!name || !type || !breed || !age || !gender || !image || !healthStatus || !adoptionStatus || !description) {
            return res.status(400).json({
                message: "Name, type, breed, age, gender, image and health/adoption status are required",
            });
        }
        const newPet = new Pet({
            name,
            type,
            breed,
            age,
            image,
            description,
            gender,
            healthStatus,
            adoptionStatus,
        });
        await newPet.save();
        res.status(201).json({
            message: "Pet added successfully",
            pet: newPet,
        });
    } catch (error) {
        console.error("Add Pet Error:", error);
        res.status(500).json({
            message: "Failed to add pet",
        });
    }
};

//UPDATE PET
exports.updatePet = async (req, res) => {
    const { id } = req.params;

    const editedPet = await Pet.findOneAndUpdate({ _id: id }, req.body, { returnDocument: "after" });
    res.json(editedPet);
};

//DELETE PET
exports.deletePet = async (req, res) => {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    res.json(pet);
};

//GET PET COUNT
exports.getPetCount = async (req, res) => {
    try {
        const count = await Pet.countDocuments();
        res.status(200).json({
            count,
        });
    } catch (error) {
        console.error("Get Pet Count Error:", error);
        res.status(500).json({
            message: "Failed to get pet count",
        });
    }
};
