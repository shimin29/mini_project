import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import "../CSS/SubmitPet.css";

function SubmitPet() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        type: "",
        breed: "",
        gender: "",
        age: "",
        healthStatus: "",
        image: "",
        description: "",
        reason: "",
    });

    const [submitting, setSubmitting] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Submit pet
    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first.");
            navigate("/login");
            return;
        }

        try {
            setSubmitting(true);

            await axios.post(
                "http://localhost:3000/pet-submissions",
                {
                    ...formData,
                    age: Number(formData.age),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            alert("Pet submitted successfully! Please wait for admin approval.");

            navigate("/home");
        } catch (error) {
            console.log("Submit Pet Error:", error);

            alert(error.response?.data?.message || "Failed to submit pet. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="submit-pet-page">
            <Navbar role="user" />

            <main className="submit-pet-container">
                {/* Page Header */}
                <div className="submit-pet-header">
                    <p className="section-small-title">GIVE THEM A NEW CHANCE</p>

                    <h1>Submit Your Pet</h1>

                    <p>Help your pet find a loving new home. Submit the information below and our admin team will review your request.</p>
                </div>

                {/* Form Card */}
                <div className="submit-pet-card">
                    <form onSubmit={handleSubmit}>
                        {/* Basic Information */}
                        <div className="form-section">
                            <h2>Pet Information</h2>

                            <p className="form-section-description">Tell us about the pet you would like to submit for adoption.</p>

                            {/* Name */}
                            <div className="form-group">
                                <label>Pet Name</label>

                                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter pet name" required />
                            </div>

                            {/* Type + Breed */}
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Type</label>

                                    <select name="type" value={formData.type} onChange={handleChange} required>
                                        <option value="">Select type</option>

                                        <option value="Dog">Dog</option>

                                        <option value="Cat">Cat</option>

                                        <option value="Rabbit">Rabbit</option>

                                        <option value="Bird">Bird</option>

                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Breed</label>

                                    <input type="text" name="breed" value={formData.breed} onChange={handleChange} placeholder="e.g. Golden Retriever" required />
                                </div>
                            </div>

                            {/* Gender + Age */}
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Gender</label>

                                    <select name="gender" value={formData.gender} onChange={handleChange} required>
                                        <option value="">Select gender</option>

                                        <option value="Male">Male</option>

                                        <option value="Female">Female</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Age</label>

                                    <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Enter age" min="0" required />
                                </div>
                            </div>

                            {/* Health */}
                            <div className="form-group">
                                <label>Health Status</label>

                                <input type="text" name="healthStatus" value={formData.healthStatus} onChange={handleChange} placeholder="e.g. Healthy, Vaccinated" required />
                            </div>

                            {/* Image */}
                            <div className="form-group">
                                <label>Pet Image URL</label>

                                <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Paste pet image URL" required />

                                <small>Please provide a valid image URL.</small>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="form-section">
                            <h2>About Your Pet</h2>

                            <p className="form-section-description">Give potential adopters more information about your pet.</p>

                            <div className="form-group">
                                <label>Description</label>

                                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Tell us about your pet's personality, habits and special characteristics..." rows="5" />
                            </div>
                        </div>

                        {/* Reason */}
                        <div className="form-section">
                            <h2>Reason for Submission</h2>

                            <p className="form-section-description">Please explain why you are looking for a new home for your pet.</p>

                            <div className="form-group">
                                <label>Why are you submitting this pet?</label>

                                <textarea name="reason" value={formData.reason} onChange={handleChange} placeholder="Please explain the reason..." rows="5" required />
                            </div>
                        </div>

                        {/* Notice */}
                        <div className="submit-pet-notice">
                            <span>🐾</span>

                            <div>
                                <strong>What happens next?</strong>

                                <p>Your submission will be reviewed by our admin team. Once approved, your pet will be listed on PawMatch and other users can apply to adopt.</p>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="submit-pet-actions">
                            <button type="button" className="cancel-submit-btn" onClick={() => navigate("/pet")}>
                                Cancel
                            </button>

                            <button type="submit" className="submit-pet-btn" disabled={submitting}>
                                {submitting ? "Submitting..." : "🐾 Submit Pet"}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default SubmitPet;
