import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import Navbar from "../components/Navbar";

function PetDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    const fetchPet = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/pets/${id}`);

            console.log("Pet Details:", response.data);

            setPet(response.data);
        } catch (error) {
            console.log("Get Pet Details Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPet();
    }, [id]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/login");
    };

    if (loading) {
        return (
            <div className="pet-details-message">
                <p>Loading pet details...</p>
            </div>
        );
    }

    if (!pet) {
        return (
            <div className="pet-details-message">
                <h2>Pet not found</h2>

                <button onClick={() => navigate("/pet")}>Back to Pets</button>
            </div>
        );
    }

    return (
        <div className="pet-details-page">
            {/* Navbar */}
            <Navbar role="user" />

            {/* Back Button */}
            <div className="pet-details-container">
                <button className="back-pets-btn" onClick={() => navigate("/pet")}>
                    ← Back to Pets
                </button>

                {/* Details */}
                <div className="pet-details-card">
                    {/* Image */}
                    <div className="pet-details-image">
                        <img src={pet.image} alt={pet.name} />

                        <span className={`pet-status ${pet.adoptionStatus.toLowerCase().replace(" ", "-")}`}>{pet.adoptionStatus}</span>
                    </div>

                    {/* Information */}
                    <div className="pet-details-info">
                        <p className="section-small-title">MEET YOUR NEW COMPANION</p>

                        <h1>{pet.name}</h1>

                        <p className="pet-details-breed">{pet.breed}</p>

                        {/* Basic Information */}
                        <div className="pet-info-grid">
                            <div>
                                <span>Type</span>
                                <strong>{pet.type}</strong>
                            </div>

                            <div>
                                <span>Gender</span>
                                <strong>{pet.gender}</strong>
                            </div>

                            <div>
                                <span>Age</span>
                                <strong>{pet.age} years</strong>
                            </div>

                            <div>
                                <span>Health</span>
                                <strong>{pet.healthStatus}</strong>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="pet-description">
                            <h3>About {pet.name}</h3>

                            <p>{pet.description || `${pet.name} is looking for a loving forever home.`}</p>
                        </div>

                        {/* Adoption */}
                        {pet.adoptionStatus === "Available" ? (
                            <button className="adopt-btn" onClick={() => navigate(`/adopt/${pet._id}`)}>
                                ❤️ Adopt {pet.name}
                            </button>
                        ) : (
                            <button className="adopt-btn disabled" disabled>
                                {pet.adoptionStatus === "Pending" ? "Adoption Pending" : "Already Adopted"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PetDetails;
