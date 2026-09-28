const mongoose = require("mongoose");

const PetSchema = mongoose.Schema({
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
        default: "Healthy",
    },

    adoptionStatus: {
        type: String,
        enum: ["Available", "Pending", "Adopted"],
        default: "Available",
    },

    image: {
        type: String,
        required: true,
    },

    description: {
        type: String,
    },
});

const Pet = mongoose.model("pet", PetSchema);

module.exports = Pet;
