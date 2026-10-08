import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import Navbar from "../components/Navbar";
import "../CSS/PetDetails.css";

function PetDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [pet, setPet] = useState(null);
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);

    // Get pet details
    const fetchPet = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/pets/${id}`);

            console.log("Pet Details:", response.data);

            setPet(response.data);
        } catch (error) {
            console.log("Get Pet Details Error:", error);
        }
    };

    // Get current user's application for this pet
    const fetchApplication = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                return;
            }

            const response = await axios.get("http://localhost:3000/adoption-applications/my", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("My Applications:", response.data);

            // Find application for current pet
            const currentApplication = response.data.find((item) => {
                const applicationPetId = typeof item.petId === "object" ? item.petId?._id : item.petId;

                return applicationPetId === id;
            });

            console.log("Current Pet ID:", id);
            console.log("Current Application:", currentApplication);

            setApplication(currentApplication || null);
        } catch (error) {
            console.log("Get My Application Error:", error);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);

            await Promise.all([fetchPet(), fetchApplication()]);

            setLoading(false);
        };

        loadData();
    }, [id]);

    // Adoption button
    const renderAdoptButton = () => {
        // Pet already adopted
        if (pet.adoptionStatus === "Adopted") {
            return (
                <button className="adopt-btn disabled" disabled>
                    🏠 Already Adopted
                </button>
            );
        }

        // Pet adoption is pending
        if (pet.adoptionStatus === "Pending") {
            return (
                <button className="adopt-btn disabled" disabled>
                    ⏳ Adoption Pending
                </button>
            );
        }

        // User already has an application
        if (application) {
            // Pending application
            if (application.status === "Pending") {
                return (
                    <button className="adopt-btn disabled" disabled>
                        ⏳ Application Pending
                    </button>
                );
            }

            // Approved application
            if (application.status === "Approved") {
                return (
                    <button className="adopt-btn disabled" disabled>
                        ✅ Application Approved
                    </button>
                );
            }

            // Rejected application
            if (application.status === "Rejected") {
                return (
                    <button className="adopt-btn disabled" disabled>
                        ❌ Application Rejected
                    </button>
                );
            }
        }

        // Available + no application
        return (
            <button className="adopt-btn" onClick={() => navigate(`/adopt/${pet._id}`)}>
                ❤️ Adopt {pet.name}
            </button>
        );
    };

    // Loading
    if (loading) {
        return (
            <div className="pet-details-page">
                <Navbar role="user" />

                <div className="pet-details-message">
                    <div className="pet-message-icon">🐾</div>

                    <h2>Loading pet details...</h2>

                    <p>Please wait while we load the pet information.</p>
                </div>
            </div>
        );
    }

    // Pet not found
    if (!pet) {
        return (
            <div className="pet-details-page">
                <Navbar role="user" />

                <div className="pet-details-message">
                    <div className="pet-message-icon">🐾</div>

                    <h2>Pet not found</h2>

                    <p>Sorry, we couldn't find this pet.</p>

                    <button className="back-pets-btn" onClick={() => navigate("/pet")}>
                        ← Back to Pets
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="pet-details-page">
            <Navbar role="user" />

            <main className="pet-details-container">
                {/* Back Button */}
                <button className="back-pets-btn" onClick={() => navigate("/pet")}>
                    ← Back to Pets
                </button>

                {/* Details Card */}
                <div className="pet-details-card">
                    {/* Pet Image */}
                    <div className="pet-details-image">
                        <img src={pet.image} alt={pet.name} />

                        <span className={`pet-status ${pet.adoptionStatus.toLowerCase().replace(" ", "-")}`}>{pet.adoptionStatus}</span>
                    </div>

                    {/* Pet Information */}
                    <div className="pet-details-info">
                        <p className="section-small-title">MEET YOUR NEW COMPANION</p>

                        <h1>{pet.name}</h1>

                        <p className="pet-details-breed">{pet.breed}</p>

                        {/* Basic Information */}
                        <div className="pet-info-grid">
                            <div>
                                <span>Pet ID</span>
                                <strong>{pet._id}</strong>
                            </div>

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

                        {/* Adoption Button */}
                        {renderAdoptButton()}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default PetDetails;
