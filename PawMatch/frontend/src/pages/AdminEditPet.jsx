import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import Navbar from "../components/Navbar";

function AdminEditPet() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        type: "",
        breed: "",
        gender: "Male",
        age: "",
        healthStatus: "Healthy",
        adoptionStatus: "Available",
        image: "",
        description: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const token = localStorage.getItem("token");

    // Get pet by ID
    const fetchPet = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/pets/${id}`);

            const pet = response.data;

            setFormData({
                name: pet.name || "",
                type: pet.type || "",
                breed: pet.breed || "",
                gender: pet.gender || "Male",
                age: pet.age || "",
                healthStatus: pet.healthStatus || "Healthy",
                adoptionStatus: pet.adoptionStatus || "Available",
                image: pet.image || "",
                description: pet.description || "",
            });
        } catch (error) {
            console.log("Get Pet Error:", error);
            alert("Failed to get pet");
            navigate("/admin/pets");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPet();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Update pet
    const handleSubmit = async (e) => {
        e.preventDefault();

        setSaving(true);

        try {
            await axios.put(`http://localhost:3000/pets/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert("Pet updated successfully!");

            navigate("/admin/pets");
        } catch (error) {
            console.log("Update Pet Error:", error);

            alert(error.response?.data?.message || "Failed to update pet");
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/login");
    };

    if (loading) {
        return (
            <div className="admin-loading">
                <div className="loading-spinner"></div>
                <p>Loading pet...</p>
            </div>
        );
    }

    return (
        <div className="admin-add-pet-page">
            {/* Navbar */}
            <Navbar role="admin" />
            {/* Main */}

            <main className="admin-form-container">
                {/* Back */}

                <button className="back-to-pets" onClick={() => navigate("/admin/pets")}>
                    ← Back to Manage Pets
                </button>

                {/* Header */}

                <div className="admin-form-header">
                    <p>ADMIN PANEL</p>

                    <h1>
                        Edit <span>Pet</span>
                    </h1>

                    <span>Update the pet information on PawMatch.</span>
                </div>

                {/* Form */}

                <form className="admin-pet-form" onSubmit={handleSubmit}>
                    <div className="form-section-title">
                        <span>✏️</span>

                        <div>
                            <h2>Pet Information</h2>

                            <p>Update the information about this pet.</p>
                        </div>
                    </div>

                    {/* Name + Type */}

                    <div className="form-row">
                        <div className="form-group">
                            <label>Pet Name</label>

                            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Max" required />
                        </div>

                        <div className="form-group">
                            <label>Animal Type</label>

                            <input type="text" name="type" value={formData.type} onChange={handleChange} placeholder="e.g. Dog, Cat, Rabbit" required />
                        </div>
                    </div>

                    {/* Breed + Gender */}

                    <div className="form-row">
                        <div className="form-group">
                            <label>Breed</label>

                            <input type="text" name="breed" value={formData.breed} onChange={handleChange} placeholder="e.g. Golden Retriever" required />
                        </div>

                        <div className="form-group">
                            <label>Gender</label>

                            <select name="gender" value={formData.gender} onChange={handleChange}>
                                <option value="Male">Male</option>

                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>

                    {/* Age + Health */}

                    <div className="form-row">
                        <div className="form-group">
                            <label>Age</label>

                            <input type="number" name="age" value={formData.age} onChange={handleChange} min="0" required />
                        </div>

                        <div className="form-group">
                            <label>Health Status</label>

                            <select name="healthStatus" value={formData.healthStatus} onChange={handleChange}>
                                <option value="Healthy">Healthy</option>

                                <option value="Under Treatment">Under Treatment</option>

                                <option value="Special Needs">Special Needs</option>
                            </select>
                        </div>
                    </div>

                    {/* Adoption Status */}

                    <div className="form-group">
                        <label>Adoption Status</label>

                        <select name="adoptionStatus" value={formData.adoptionStatus} onChange={handleChange}>
                            <option value="Available">Available</option>

                            <option value="Pending">Pending</option>

                            <option value="Adopted">Adopted</option>
                        </select>
                    </div>

                    {/* Image */}

                    <div className="form-group">
                        <label>Image URL</label>

                        <input type="url" name="image" value={formData.image} onChange={handleChange} placeholder="https://example.com/pet.jpg" required />

                        <small>Use a direct URL to the pet image.</small>
                    </div>

                    {/* Description */}

                    <div className="form-group">
                        <label>Description</label>

                        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Tell potential adopters about this pet..." rows="5" required />
                    </div>

                    {/* Actions */}

                    <div className="admin-form-actions">
                        <button type="button" className="cancel-pet-btn" onClick={() => navigate("/admin/pets")}>
                            Cancel
                        </button>

                        <button type="submit" className="save-pet-btn" disabled={saving}>
                            {saving ? "Saving..." : "✓ Save Changes"}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default AdminEditPet;
