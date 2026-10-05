import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";

function MyApplications() {
    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchApplications = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get("http://localhost:3000/adoption-applications/my", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("My Applications:", response.data);

            setApplications(response.data);
        } catch (error) {
            console.log("Get My Applications Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/login");
    };

    const getStatusClass = (status) => {
        if (status === "Approved") {
            return "status-approved";
        }

        if (status === "Rejected") {
            return "status-rejected";
        }

        return "status-pending";
    };

    if (loading) {
        return (
            <div className="application-message">
                <p>Loading your applications...</p>
            </div>
        );
    }

    return (
        <div className="my-applications-page">
            {/* NAVBAR */}
            <Navbar role="user" />

            {/* MAIN CONTENT */}
            <main className="my-applications-container">
                <div className="applications-header">
                    <p className="section-small-title">MY APPLICATIONS</p>

                    <h1>My Adoption Applications</h1>

                    <p>Keep track of your pet adoption applications and their status.</p>
                </div>

                {/* NO APPLICATION */}
                {applications.length === 0 ? (
                    <div className="no-applications">
                        <div className="no-applications-icon">🐾</div>

                        <h2>No Applications Yet</h2>

                        <p>You haven't submitted any adoption applications yet.</p>

                        <button className="browse-pets-btn" onClick={() => navigate("/pet")}>
                            Browse Pets
                        </button>
                    </div>
                ) : (
                    <div className="applications-list">
                        {applications.map((application) => (
                            <div className="application-card" key={application._id}>
                                {/* PET IMAGE */}
                                <div className="application-pet-image">
                                    <img src={application.petId?.image} alt={application.petId?.name || "Pet"} />
                                </div>

                                {/* APPLICATION INFO */}
                                <div className="application-content">
                                    <div className="application-top">
                                        <div>
                                            <h2>{application.petId?.name || "Unknown Pet"}</h2>

                                            <p className="application-breed">{application.petId?.breed || "Unknown Breed"}</p>
                                        </div>

                                        <span className={`application-status ${getStatusClass(application.status)}`}>{application.status}</span>
                                    </div>

                                    {/* PET DETAILS */}
                                    <div className="application-pet-details">
                                        <span>🐾 {application.petId?.type || "Unknown"}</span>

                                        <span>{application.petId?.gender || "Unknown"}</span>

                                        <span>🎂 {application.petId?.age || "Unknown"}</span>
                                    </div>

                                    {/* REASON */}
                                    <div className="application-section">
                                        <h3>Why I Want to Adopt</h3>

                                        <p>{application.reason}</p>
                                    </div>

                                    {/* EXPERIENCE */}
                                    <div className="application-section">
                                        <h3>Pet Experience</h3>

                                        <p>{application.experience}</p>
                                    </div>

                                    {/* DATE */}
                                    <div className="application-date">Applied on {new Date(application.createdAt).toLocaleDateString("en-GB")}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default MyApplications;
