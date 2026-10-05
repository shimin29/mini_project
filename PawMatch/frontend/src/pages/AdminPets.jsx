import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";

function AdminPets() {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const fetchPets = async () => {
        try {
            const response = await axios.get("http://localhost:3000/pets");

            setPets(response.data);
        } catch (error) {
            console.log("Get Pets Error:", error);
            alert("Failed to get pets");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPets();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this pet?");

        if (!confirmDelete) {
            return;
        }

        try {
            await axios.delete(`http://localhost:3000/pets/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert("Pet deleted successfully");

            fetchPets();
        } catch (error) {
            console.log("Delete Pet Error:", error);

            alert(error.response?.data?.message || "Failed to delete pet");
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
                <p>Loading pets...</p>
            </div>
        );
    }

    return (
        <div className="admin-pets-page">
            {/* NAVBAR */}
            <Navbar role="admin" />

            {/* MAIN */}

            <main className="admin-pets-container">
                {/* HEADER */}
                <button className="back-to-pets" onClick={() => navigate("/admin/dashboard")}>
                    ← Back to Dashboard
                </button>

                <div className="admin-pets-header">
                    <div>
                        <p className="admin-section-label">ADMIN PANEL</p>

                        <h1>
                            Manage <span>Pets</span>
                        </h1>

                        <p className="admin-section-description">Manage all pets available on the PawMatch platform.</p>
                    </div>

                    <button className="add-pet-btn" onClick={() => navigate("/admin/pets/add")}>
                        <span>+</span>
                        Add Pet
                    </button>
                </div>

                {/* PET LIST */}

                {pets.length === 0 ? (
                    <div className="no-admin-pets">
                        <div className="empty-icon">🐾</div>

                        <h2>No Pets Found</h2>

                        <p>There are currently no pets in the system.</p>

                        <button className="add-pet-btn" onClick={() => navigate("/admin/pets/add")}>
                            + Add Your First Pet
                        </button>
                    </div>
                ) : (
                    <div className="admin-pets-grid">
                        {pets.map((pet) => (
                            <div className="admin-pet-card" key={pet._id}>
                                {/* IMAGE */}

                                <div className="admin-pet-image-wrapper">
                                    <img src={pet.image} alt={pet.name} className="admin-pet-image" />

                                    <span className={`admin-status ${pet.adoptionStatus.toLowerCase().replace(" ", "-")}`}>{pet.adoptionStatus}</span>
                                </div>

                                {/* INFO */}

                                <div className="admin-pet-info">
                                    <div className="admin-pet-title">
                                        <div>
                                            <h2>{pet.name}</h2>

                                            <p>{pet.breed}</p>
                                        </div>
                                    </div>

                                    <div className="admin-pet-details">
                                        <span>🐾 {pet.type}</span>

                                        <span>🎂 {pet.age} years</span>

                                        <span>⚧ {pet.gender}</span>
                                    </div>

                                    <div className="admin-pet-health">
                                        <span>Health Status</span>

                                        <strong>{pet.healthStatus}</strong>
                                    </div>

                                    {/* ACTIONS */}

                                    <div className="admin-pet-actions">
                                        <button className="edit-pet-btn" onClick={() => navigate(`/admin/pets/edit/${pet._id}`)}>
                                            ✏️ Edit
                                        </button>

                                        <button className="delete-pet-btn" onClick={() => handleDelete(pet._id)}>
                                            🗑 Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default AdminPets;
