const mongoose = require("mongoose");

const AdoptionApplicationSchema = mongoose.Schema(
    {
        applicantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },

        petId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "pet",
            required: true,
        },

        reason: {
            type: String,
            required: true,
        },

        experience: {
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

const AdoptionApplication = mongoose.model("adoptionApplication", AdoptionApplicationSchema);

module.exports = AdoptionApplication;