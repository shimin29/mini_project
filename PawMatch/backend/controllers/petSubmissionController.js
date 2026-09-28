const PetSubmission = require("../models/PetSubmission");

// CREATE PET SUBMISSION
exports.createPetSubmission = async (req, res) => {
    try {
        const {
            name,
            type,
            breed,
            gender,
            age,
            healthStatus,
            image,
            description,
            reason,
        } = req.body;

        // Check required fields
        if (
            !name ||
            !type ||
            !breed ||
            !gender ||
            !age ||
            !healthStatus ||
            !image ||
            !reason
        ) {
            return res.status(400).json({
                message: "Please fill in all required fields",
            });
        }

        const submission = new PetSubmission({
            ownerId: req.user._id,

            name,
            type,
            breed,
            gender,
            age,
            healthStatus,
            image,
            description,
            reason,

            status: "Pending",
        });

        await submission.save();

        res.status(201).json({
            message: "Pet submission successful",
            submission,
        });

    } catch (error) {
        console.error("Pet Submission Error:", error);

        res.status(500).json({
            message: "Failed to submit pet",
        });
    }
};