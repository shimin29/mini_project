import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function AdminApplications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const fetchApplications = async () => {
        try {
            const response = await axios.get("http://localhost:3000/adoption-applications", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Applications:", response.data);

            setApplications(response.data);
        } catch (error) {
            console.log("Get Applications Error:", error);

            alert(error.response?.data?.message || "Failed to get adoption applications");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const approveApplication = async (id) => {
        const confirmApprove = window.confirm("Are you sure you want to approve this adoption application?");

        if (!confirmApprove) return;

        try {
            await axios.put(
                `http://localhost:3000/adoption-applications/${id}/approve`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            alert("Application approved!");

            fetchApplications();
        } catch (error) {
            console.log("Approve Application Error:", error);

            alert(error.response?.data?.message || "Failed to approve application");
        }
    };

    const rejectApplication = async (id) => {
        const confirmReject = window.confirm("Are you sure you want to reject this adoption application?");

        if (!confirmReject) return;

        try {
            await axios.put(
                `http://localhost:3000/adoption-applications/${id}/reject`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            alert("Application rejected!");

            fetchApplications();
        } catch (error) {
            console.log("Reject Application Error:", error);

            alert(error.response?.data?.message || "Failed to reject application");
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
                <p>Loading applications...</p>
            </div>
        );
    }

    return (
        <div className="admin-applications-page">
            {/* Navbar */}
            <nav className="admin-navbar">
                <div className="admin-logo" onClick={() => navigate("/admin/dashboard")}>
                    🐾 PawMatch
                    <span>Admin</span>
                </div>

                <button className="admin-logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </nav>

            {/* Main */}
            <main className="admin-applications-container">
                {/* Header */}
                <div className="admin-applications-header">
                    <button className="back-to-pets" onClick={() => navigate("/admin/dashboard")}>
                        ← Back to Dashboard
                    </button>

                    <p className="admin-section-label">ADMIN PANEL</p>

                    <h1>
                        Adoption <span>Applications</span>
                    </h1>

                    <p className="admin-section-description">Review and manage adoption applications submitted by PawMatch users.</p>
                </div>

                {/* Empty */}
                {applications.length === 0 ? (
                    <div className="no-admin-applications">
                        <div className="empty-icon">❤️</div>

                        <h2>No Applications</h2>

                        <p>There are currently no adoption applications.</p>
                    </div>
                ) : (
                    /* Applications */
                    <div className="admin-applications-list">
                        {applications.map((application) => (
                            <div className="application-card" key={application._id}>
                                {/* Pet Image */}
                                <div className="application-image-wrapper">
                                    {application.petId?.image ? <img src={application.petId.image} alt={application.petId.name} className="application-image" /> : <div className="application-no-image">🐾</div>}

                                    <span className={`application-status ${application.status.toLowerCase()}`}>{application.status}</span>
                                </div>

                                {/* Content */}
                                <div className="application-content">
                                    {/* Pet */}
                                    <div className="application-pet-title">
                                        <div>
                                            <p className="application-label">PET</p>

                                            <h2>{application.petId?.name || "Unknown Pet"}</h2>

                                            <span>{application.petId?.breed || "Unknown Breed"}</span>
                                        </div>
                                    </div>

                                    {/* Pet Details */}
                                    <div className="application-pet-details">
                                        <span>🐾 {application.petId?.type || "Unknown"}</span>

                                        <span>🎂 {application.petId?.age ?? "-"} years</span>

                                        <span>⚧ {application.petId?.gender || "-"}</span>
                                    </div>

                                    {/* Applicant */}
                                    <div className="application-applicant">
                                        <p>APPLICANT</p>

                                        <strong>{application.applicantId?.name || "Unknown User"}</strong>

                                        <span>{application.applicantId?.email || ""}</span>
                                    </div>

                                    {/* Reason */}
                                    <div className="application-section">
                                        <p>Reason for Adoption</p>

                                        <div className="application-text-box">{application.reason}</div>
                                    </div>

                                    {/* Experience */}
                                    <div className="application-section">
                                        <p>Previous Pet Experience</p>

                                        <div className="application-text-box">{application.experience}</div>
                                    </div>

                                    {/* Actions */}
                                    {application.status === "Pending" && (
                                        <div className="application-actions">
                                            <button className="approve-btn" onClick={() => approveApplication(application._id)}>
                                                ✓ Approve
                                            </button>

                                            <button className="reject-btn" onClick={() => rejectApplication(application._id)}>
                                                ✕ Reject
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default AdminApplications;
