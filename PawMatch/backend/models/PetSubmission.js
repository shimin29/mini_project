const mongoose = require("mongoose");

const PetSubmissionSchema = mongoose.Schema(
    {
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },

        name: {
            type: String,
            required: true,
        },

        type: {
            type: String,
            required: true,
        },

        breed: {
            type: String,
            required: true,
        },

        gender: {
            type: String,
            enum: ["Male", "Female"],
            required: true,
        },

        age: {
            type: Number,
            required: true,
        },

        healthStatus: {
            type: String,
            enum: ["Healthy", "Under Treatment", "Special Needs"],
            required: true,
        },

        image: {
            type: String,
            required: true,
        },

        description: {
            type: String,
        },

        reason: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"],
            default: "Pending",
        },
    },
    {
        timestamps: true,
    }
);

const PetSubmission = mongoose.model("petSubmission", PetSubmissionSchema);

module.exports = PetSubmission;