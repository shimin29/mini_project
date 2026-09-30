const AdoptionApplication = require("../models/AdoptionApplication");
const Pet = require("../models/Pet");

// CREATE ADOPTION APPLICATION
exports.createAdoptionApplication = async (req, res) => {
    try {
        const { petId, reason, experience } = req.body;

        // Check required fields
        if (!petId || !reason || !experience) {
            return res.status(400).json({
                message: "Pet ID, reason and experience are required",
            });
        }

        // Check if pet exists
        const pet = await Pet.findById(petId);

        if (!pet) {
            return res.status(404).json({
                message: "Pet not found",
            });
        }

        // Check if pet is available
        if (pet.adoptionStatus !== "Available") {
            return res.status(400).json({
                message: "This pet is not available for adoption",
            });
        }

        // Check if user already applied for this pet
        const existingApplication = await AdoptionApplication.findOne({
            applicantId: req.user._id,
            petId: petId,
            status: "Pending",
        });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this pet",
            });
        }

        // Create application
        const application = new AdoptionApplication({
            applicantId: req.user._id,
            petId,
            reason,
            experience,
            status: "Pending",
        });

        await application.save();

        res.status(201).json({
            message: "Adoption application submitted successfully",
            application,
        });
    } catch (error) {
        console.error("Create Adoption Application Error:", error);

        res.status(500).json({
            message: "Failed to submit adoption application",
        });
    }
};

// GET MY ADOPTION APPLICATIONS
exports.getMyAdoptionApplications = async (req, res) => {
    try {
        const applications = await AdoptionApplication.find({
            applicantId: req.user._id,
        }).populate("petId");

        res.status(200).json(applications);
    } catch (error) {
        console.error("Get My Applications Error:", error);

        res.status(500).json({
            message: "Failed to get your applications",
        });
    }
};

// GET ALL ADOPTION APPLICATIONS - ADMIN
exports.getAllAdoptionApplications = async (req, res) => {
    try {
        const applications = await AdoptionApplication.find({}).populate("applicantId", "name email").populate("petId").sort({ createdAt: -1 });

        res.status(200).json(applications);
    } catch (error) {
        console.error("Get All Adoption Applications Error:", error);

        res.status(500).json({
            message: "Failed to get adoption applications",
        });
    }
};

// APPROVE ADOPTION APPLICATION - ADMIN
exports.approveAdoptionApplication = async (req, res) => {
    try {
        const application = await AdoptionApplication.findById(req.params.id);

        if (!application) {
            return res.status(404).json({
                message: "Adoption application not found",
            });
        }

        if (application.status !== "Pending") {
            return res.status(400).json({
                message: "This application has already been reviewed",
            });
        }

        const pet = await Pet.findById(application.petId);

        if (!pet) {
            return res.status(404).json({
                message: "Pet not found",
            });
        }

        if (pet.adoptionStatus !== "Available") {
            return res.status(400).json({
                message: "This pet is no longer available for adoption",
            });
        }

        // Approve application
        application.status = "Approved";
        await application.save();

        // Mark pet as adopted
        pet.adoptionStatus = "Adopted";
        await pet.save();

        res.status(200).json({
            message: "Adoption application approved",
        });
    } catch (error) {
        console.error("Approve Adoption Application Error:", error);

        res.status(500).json({
            message: "Failed to approve adoption application",
        });
    }
};

// REJECT ADOPTION APPLICATION - ADMIN
exports.rejectAdoptionApplication = async (req, res) => {
    try {
        const application = await AdoptionApplication.findById(req.params.id);

        if (!application) {
            return res.status(404).json({
                message: "Adoption application not found",
            });
        }

        if (application.status !== "Pending") {
            return res.status(400).json({
                message: "This application has already been reviewed",
            });
        }

        application.status = "Rejected";

        await application.save();

        res.status(200).json({
            message: "Adoption application rejected",
        });
    } catch (error) {
        console.error("Reject Adoption Application Error:", error);

        res.status(500).json({
            message: "Failed to reject adoption application",
        });
    }
};
