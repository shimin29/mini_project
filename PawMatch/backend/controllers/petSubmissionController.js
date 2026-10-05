const PetSubmission = require("../models/PetSubmission");
const Pet = require("../models/Pet");

// CREATE PET SUBMISSION
exports.createPetSubmission = async (req, res) => {
    try {
        const { name, type, breed, gender, age, healthStatus, image, description, reason } = req.body;

        if (!name || !type || !breed || !gender || !age || !healthStatus || !image || !reason) {
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

// GET ALL PET SUBMISSIONS
exports.getAllPetSubmissions = async (req, res) => {
    try {
        const submissions = await PetSubmission.find({}).populate("ownerId", "name email").sort({ createdAt: -1 });

        res.status(200).json(submissions);
    } catch (error) {
        console.error("Get Pet Submissions Error:", error);

        res.status(500).json({
            message: "Failed to get pet submissions",
        });
    }
};

// APPROVE PET SUBMISSION
exports.approvePetSubmission = async (req, res) => {
    try {
        console.log("Approve ID:", req.params.id);

        const submission = await PetSubmission.findById(req.params.id);

        console.log("Submission:", submission);

        if (!submission) {
            return res.status(404).json({
                message: "Pet submission not found",
            });
        }

        if (submission.status !== "Pending") {
            return res.status(400).json({
                message: "This submission has already been reviewed",
            });
        }

        const pet = new Pet({
            name: submission.name,
            type: submission.type,
            breed: submission.breed,
            gender: submission.gender,
            age: submission.age,
            healthStatus: submission.healthStatus,
            adoptionStatus: "Available",
            image: submission.image,
            description: submission.description,
        });

        console.log("New Pet:", pet);

        await pet.save();

        console.log("Pet saved:", pet._id);

        submission.status = "Approved";

        await submission.save();

        console.log("Submission approved");

        return res.status(200).json({
            message: "Pet submission approved",
            pet: pet,
            submission: submission,
        });
    } catch (error) {
        console.error("APPROVE ERROR:", error);

        return res.status(500).json({
            message: "Failed to approve pet submission",
            error: error.message,
        });
    }
};

// REJECT PET SUBMISSION
exports.rejectPetSubmission = async (req, res) => {
    try {
        const submission = await PetSubmission.findById(req.params.id);

        if (!submission) {
            return res.status(404).json({
                message: "Pet submission not found",
            });
        }

        if (submission.status !== "Pending") {
            return res.status(400).json({
                message: "This submission has already been reviewed",
            });
        }

        submission.status = "Rejected";

        await submission.save();

        res.status(200).json({
            message: "Pet submission rejected",
            submission,
        });
    } catch (error) {
        console.error("Reject Pet Submission Error:", error);

        res.status(500).json({
            message: "Failed to reject pet submission",
        });
    }
};

// GET PENDING PET SUBMISSION COUNT
exports.getPendingPetSubmissionCount = async (req, res) => {
    try {
        const count = await PetSubmission.countDocuments({
            status: "Pending",
        });

        res.status(200).json({
            count,
        });
    } catch (error) {
        console.error("Get Pending Pet Submission Count Error:", error);

        res.status(500).json({
            message: "Failed to get pending submission count",
        });
    }
};
