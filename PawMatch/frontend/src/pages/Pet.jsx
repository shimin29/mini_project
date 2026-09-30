import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./Pet.css";

function Pet() {
    const [pets, setPets] = useState([]);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const fetchPets = async () => {
        try {
            const response = await axios.get("http://localhost:3000/pets");

            console.log("Pets:", response.data);

            setPets(response.data);
        } catch (error) {
            console.log("Get Pets Error:", error);
        }
    };

    const fetchMyApplications = async () => {
        try {
            const response = await axios.get("http://localhost:3000/adoption-applications/my", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("My Applications:", response.data);

            setApplications(response.data);
        } catch (error) {
            console.log("Get My Applications Error:", error);
        }
    };

    const fetchData = async () => {
        setLoading(true);

        await Promise.all([fetchPets(), fetchMyApplications()]);

        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="pet-page-loading">
                <p>Loading pets...</p>
            </div>
        );
    }

    return (
        <div className="pet-page">
            {/* Header */}
            <section className="pet-header">
                <p className="section-small-title">FIND YOUR COMPANION</p>

                <h1>
                    Meet Your <span>New Best Friend</span>
                </h1>

                <p>Find a loving companion and give a pet a forever home.</p>
            </section>

            {/* Pets */}
            <section className="pets-section">
                {pets.length === 0 ? (
                    <div className="no-pets">
                        <h2>No pets available</h2>
                        <p>There are currently no pets available for adoption.</p>
                    </div>
                ) : (
                    <div className="pets-container">
                        {pets.map((pet) => {
                            const application = applications.find((app) => app.petId?._id === pet._id);

                            return (
                                <div className="pet-card" key={pet._id}>
                                    {/* Image */}
                                    <div className="pet-image">
                                        <img src={pet.image} alt={pet.name} />
                                    </div>

                                    {/* Information */}
                                    <div className="pet-info">
                                        <div className="pet-title-row">
                                            <h3>{pet.name}</h3>

                                            <span className={`status-badge ${pet.adoptionStatus.toLowerCase()}`}>{pet.adoptionStatus}</span>
                                        </div>

                                        <p className="pet-breed">{pet.breed}</p>

                                        <div className="pet-details">
                                            <span>🐾 {pet.type}</span>

                                            <span>🎂 {pet.age} years</span>

                                            <span>⚧ {pet.gender}</span>
                                        </div>

                                        <p className="pet-health">Health: {pet.healthStatus}</p>

                                        {/* No application */}
                                        {pet.adoptionStatus === "Available" && !application && (
                                            <button className="pet-btn" onClick={() => navigate(`/adopt/${pet._id}`)}>
                                                Adopt
                                            </button>
                                        )}

                                        {/* Pending */}
                                        {pet.adoptionStatus === "Available" && application && application.status === "Pending" && (
                                            <button className="pet-btn disabled" disabled>
                                                Application Pending
                                            </button>
                                        )}

                                        {/* Approved */}
                                        {application && application.status === "Approved" && (
                                            <button className="pet-btn approved" disabled>
                                                Application Approved
                                            </button>
                                        )}

                                        {/* Rejected */}
                                        {pet.adoptionStatus === "Available" && application && application.status === "Rejected" && (
                                            <button className="pet-btn" onClick={() => navigate(`/adopt/${pet._id}`)}>
                                                Apply Again
                                            </button>
                                        )}

                                        {/* Adopted */}
                                        {pet.adoptionStatus === "Adopted" && !application && (
                                            <button className="pet-btn adopted" disabled>
                                                Adopted
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>
        </div>
    );
}

export default Pet;
