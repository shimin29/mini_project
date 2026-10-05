import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import Navbar from "../components/Navbar";

function Adopt() {
    const { petId } = useParams();
    const navigate = useNavigate();

    const [pet, setPet] = useState(null);
    const [reason, setReason] = useState("");
    const [experience, setExperience] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Get pet details
    const fetchPet = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/pets/${petId}`);

            console.log("Adoption Pet:", response.data);

            setPet(response.data);
        } catch (error) {
            console.log("Get Pet Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPet();
    }, [petId]);

    // Submit adoption application
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!reason.trim() || !experience.trim()) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            setSubmitting(true);

            const token = localStorage.getItem("token");

            await axios.post(
                "http://localhost:3000/adoption-applications",
                {
                    petId,
                    reason,
                    experience,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            alert("Adoption application submitted successfully!");

            navigate("/home");
        } catch (error) {
            console.log("Submit Adoption Application Error:", error);

            alert(error.response?.data?.message || "Failed to submit adoption application");
        } finally {
            setSubmitting(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/login");
    };

    if (loading) {
        return (
            <div className="adopt-message">
                <p>Loading...</p>
            </div>
        );
    }

    if (!pet) {
        return (
            <div className="adopt-message">
                <h2>Pet not found</h2>

                <button onClick={() => navigate("/pet")}>Back to Pets</button>
            </div>
        );
    }

    return (
        <div className="adopt-page">
            {/* Navbar */}
            <Navbar role="user" />

            {/* Page */}
            <main className="adopt-container">
                <button className="back-pets-btn" onClick={() => navigate(`/pet/${petId}`)}>
                    ← Back to Pet
                </button>

                <div className="adopt-card">
                    {/* Pet Summary */}
                    <div className="adopt-pet">
                        <div className="adopt-pet-image">
                            <img src={pet.image} alt={pet.name} />
                        </div>

                        <div className="adopt-pet-info">
                            <p className="section-small-title">ADOPTION APPLICATION</p>

                            <h1>Adopt {pet.name}</h1>

                            <p>{pet.breed}</p>

                            <div className="adopt-pet-details">
                                <span>🐾 {pet.type}</span>

                                <span>{pet.gender}</span>

                                <span>🎂 {pet.age} years</span>
                            </div>

                            <p className="adopt-description">Thank you for considering giving {pet.name} a loving forever home.</p>
                        </div>
                    </div>

                    {/* Form */}
                    <form className="adoption-form" onSubmit={handleSubmit}>
                        <div className="form-heading">
                            <h2>Tell Us About Yourself</h2>

                            <p>Please answer the questions below to help us understand your suitability for adoption.</p>
                        </div>

                        {/* Reason */}
                        <div className="form-group">
                            <label>Why do you want to adopt {pet.name}?</label>

                            <textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Tell us why you would like to adopt this pet..." rows="5" required />
                        </div>

                        {/* Experience */}
                        <div className="form-group">
                            <label>Do you have previous pet experience?</label>

                            <textarea value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="Tell us about your previous experience with pets..." rows="5" required />
                        </div>

                        {/* Submit */}
                        <button type="submit" className="submit-adoption-btn" disabled={submitting}>
                            {submitting ? "Submitting..." : "Submit Adoption Application"}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default Adopt;
