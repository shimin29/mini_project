import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import Navbar from "../components/Navbar";
import "../CSS/Adopt.css";

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
            const response = await axios.get(
                `http://localhost:3000/pets/${petId}`
            );

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
                }
            );

            alert("Adoption application submitted successfully!");

            navigate("/my-applications");
        } catch (error) {
            console.log("Submit Adoption Application Error:", error);

            alert(
                error.response?.data?.message ||
                    "Failed to submit adoption application"
            );
        } finally {
            setSubmitting(false);
        }
    };

    // Loading
    if (loading) {
        return (
            <div className="adopt-page">
                <Navbar role="user" />

                <div className="adopt-message">
                    <div className="adopt-message-icon">🐾</div>
                    <h2>Loading...</h2>
                    <p>Please wait while we load the adoption form.</p>
                </div>
            </div>
        );
    }

    // Pet not found
    if (!pet) {
        return (
            <div className="adopt-page">
                <Navbar role="user" />

                <div className="adopt-message">
                    <div className="adopt-message-icon">🐾</div>

                    <h2>Pet not found</h2>

                    <p>Sorry, we couldn't find this pet.</p>

                    <button
                        className="back-pets-btn"
                        onClick={() => navigate("/pet")}
                    >
                        ← Back to Pets
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="adopt-page">
            <Navbar role="user" />

            <main className="adopt-container">

                {/* Back Button */}
                <button
                    className="back-pets-btn"
                    onClick={() => navigate(`/pet/${petId}`)}
                >
                    ← Back to Pet
                </button>

                {/* Main Card */}
                <div className="adopt-card">

                    {/* ================================
                        PET SUMMARY
                    ================================= */}

                    <div className="adopt-pet">

                        {/* Pet Image */}
                        <div className="adopt-pet-image">
                            <img src={pet.image} alt={pet.name} />
                        </div>

                        {/* Pet Information */}
                        <div className="adopt-pet-info">

                            <p className="section-small-title">
                                ADOPTION APPLICATION
                            </p>

                            <h1>Adopt {pet.name}</h1>

                            <p className="adopt-breed">
                                {pet.breed}
                            </p>

                            <div className="adopt-pet-details">
                                <span>🐾 {pet.type}</span>

                                <span>⚥ {pet.gender}</span>

                                <span>🎂 {pet.age} years</span>
                            </div>

                            <p className="adopt-description">
                                Thank you for considering giving{" "}
                                <strong>{pet.name}</strong>{" "}
                                a loving forever home.
                            </p>

                        </div>
                    </div>


                    {/* ================================
                        APPLICATION FORM
                    ================================= */}

                    <form
                        className="adoption-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="form-heading">
                            <h2>Tell Us About Yourself</h2>

                            <p>
                                Please answer the questions below to help us
                                understand your suitability for adoption.
                            </p>
                        </div>


                        {/* Reason */}
                        <div className="form-group">

                            <label>
                                Why do you want to adopt {pet.name}?
                            </label>

                            <textarea
                                value={reason}
                                onChange={(e) =>
                                    setReason(e.target.value)
                                }
                                placeholder="Tell us why you would like to adopt this pet..."
                                rows="5"
                                required
                            />

                        </div>


                        {/* Experience */}
                        <div className="form-group">

                            <label>
                                Do you have previous pet experience?
                            </label>

                            <textarea
                                value={experience}
                                onChange={(e) =>
                                    setExperience(e.target.value)
                                }
                                placeholder="Tell us about your previous experience with pets..."
                                rows="5"
                                required
                            />

                        </div>


                        {/* Submit */}
                        <button
                            type="submit"
                            className="submit-adoption-btn"
                            disabled={submitting}
                        >
                            {submitting
                                ? "Submitting..."
                                : "❤️ Submit Adoption Application"}
                        </button>

                    </form>
                </div>
            </main>
        </div>
    );
}

export default Adopt;
