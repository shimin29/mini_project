import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

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

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            const response = await axios.post(
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

            console.log(response.data);

            alert("Pet submitted successfully!");

            navigate("/home");
        } catch (error) {
            console.log("Submit Pet Error:", error);
            console.log("Response:", error.response?.data);

            alert(error.response?.data?.message || "Failed to submit pet");
        }
    };

    return (
        <div className="submit-pet-page">
            <div className="submit-pet-card">
                <h2>Submit Your Pet</h2>

                <p>Submit your pet for adoption and wait for our admin to review your request.</p>

                <form onSubmit={handleSubmit}>
                    {/* Pet Name */}
                    <div className="form-group">
                        <label>Pet Name</label>

                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter pet name" required />
                    </div>

                    {/* Type */}
                    <div className="form-group">
                        <label>Pet Type</label>

                        <select name="type" value={formData.type} onChange={handleChange} required>
                            <option value="">Select type</option>

                            <option value="Dog">Dog</option>

                            <option value="Cat">Cat</option>

                            <option value="Rabbit">Rabbit</option>

                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Breed */}
                    <div className="form-group">
                        <label>Breed</label>

                        <input type="text" name="breed" value={formData.breed} onChange={handleChange} placeholder="Enter breed" required />
                    </div>

                    {/* Gender */}
                    <div className="form-group">
                        <label>Gender</label>

                        <select name="gender" value={formData.gender} onChange={handleChange} required>
                            <option value="">Select gender</option>

                            <option value="Male">Male</option>

                            <option value="Female">Female</option>
                        </select>
                    </div>

                    {/* Age */}
                    <div className="form-group">
                        <label>Age</label>

                        <input type="number" name="age" value={formData.age} onChange={handleChange} min="0" placeholder="Enter age" required />
                    </div>

                    {/* Health Status */}
                    <div className="form-group">
                        <label>Health Status</label>

                        <select name="healthStatus" value={formData.healthStatus} onChange={handleChange} required>
                            <option value="">Select health status</option>

                            <option value="Healthy">Healthy</option>

                            <option value="Under Treatment">Under Treatment</option>

                            <option value="Special Needs">Special Needs</option>
                        </select>
                    </div>

                    {/* Image */}
                    <div className="form-group">
                        <label>Image URL</label>

                        <input type="url" name="image" value={formData.image} onChange={handleChange} placeholder="https://example.com/pet.jpg" required />
                    </div>

                    {/* Description */}
                    <div className="form-group">
                        <label>Description</label>

                        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Tell us about your pet" />
                    </div>

                    {/* Reason */}
                    <div className="form-group">
                        <label>Reason for Adoption</label>

                        <textarea name="reason" value={formData.reason} onChange={handleChange} placeholder="Why are you putting your pet up for adoption?" required />
                    </div>

                    <button type="submit" className="submit-pet-btn">
                        Submit Pet
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SubmitPet;
