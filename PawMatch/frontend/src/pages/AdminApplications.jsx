import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";

function AdminApplications() {
    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState(null);

    const token = localStorage.getItem("token");

    // =========================
    // GET ALL APPLICATIONS
    // =========================
    const fetchApplications = async () => {
        try {
            setLoading(true);

            const response = await axios.get("http://localhost:3000/adoption-applications", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setApplications(response.data);
        } catch (error) {
            console.error("Get Applications Error:", error);

            if (error.response?.status === 401) {
                alert("Please login again.");
                localStorage.removeItem("token");
                navigate("/login");
            }

            if (error.response?.status === 403) {
                alert("Access denied. Admin only.");
                navigate("/products");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        fetchApplications();
    }, []);

    // APPROVE

    const handleApprove = async (id) => {
        const confirmApprove = window.confirm("Are you sure you want to approve this application?");

        if (!confirmApprove) return;

        try {
            setProcessingId(id);

            await axios.put(
                `http://localhost:3000/adoption-applications/${id}/approve`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            alert("Application approved successfully!");

            fetchApplications();
        } catch (error) {
            console.error("Approve Error:", error);

            alert(error.response?.data?.message || "Failed to approve application.");
        } finally {
            setProcessingId(null);
        }
    };

    // REJECT

    const handleReject = async (id) => {
        const confirmReject = window.confirm("Are you sure you want to reject this application?");

        if (!confirmReject) return;

        try {
            setProcessingId(id);

            await axios.put(
                `http://localhost:3000/adoption-applications/${id}/reject`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            alert("Application rejected.");

            fetchApplications();
        } catch (error) {
            console.error("Reject Error:", error);

            alert(error.response?.data?.message || "Failed to reject application.");
        } finally {
            setProcessingId(null);
        }
    };

    // =========================
    // LOADING
    // =========================
    if (loading) {
        return (
            <div className="admin-applications-page">
                <div className="loading-box">
                    <div className="spinner-border"></div>
                    <p>Loading applications...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-applications-page">
            <Navbar role="admin" />
            <button className="back-to-pets" onClick={() => navigate("/admin/dashboard")}>
                ← Back to Dashboard
            </button>
            {/* HEADER */}
            <div className="admin-applications-header">
                <div>
                    <span className="admin-label">ADMIN PANEL</span>

                    <h1>Adoption Applications 🐾</h1>

                    <p>Review and manage adoption applications submitted by PawMatch users.</p>
                </div>

                <div className="application-count">
                    <strong>{applications.length}</strong>

                    <span>Applications</span>
                </div>
            </div>

            {/* NO APPLICATION */}
            {applications.length === 0 ? (
                <div className="empty-applications">
                    <div className="empty-icon">🐶</div>

                    <h3>No Applications Yet</h3>

                    <p>There are currently no adoption applications to review.</p>
                </div>
            ) : (
                /* APPLICATION LIST */
                <div className="applications-list">
                    {applications.map((application) => {
                        const pet = application.petId;
                        const applicant = application.applicantId;

                        return (
                            <div className="application-card" key={application._id}>
                                {/* PET IMAGE */}
                                <div className="pet-section">
                                    {pet?.image ? <img src={pet.image} alt={pet.name} className="pet-image" /> : <div className="no-image">🐾</div>}

                                    <h3>{pet?.name || "Unknown Pet"}</h3>

                                    <span>{pet?.breed || "Unknown breed"}</span>
                                </div>

                                {/* APPLICANT */}
                                <div className="application-info">
                                    <div className="info-section">
                                        <h4>Applicant</h4>

                                        <p className="applicant-name">{applicant?.name || "Unknown"}</p>

                                        <p className="email">{applicant?.email || "No email"}</p>
                                    </div>

                                    <div className="info-section">
                                        <h4>Reason for Adoption</h4>

                                        <p>{application.reason}</p>
                                    </div>

                                    <div className="info-section">
                                        <h4>Previous Experience</h4>

                                        <p>{application.experience}</p>
                                    </div>

                                    <div className="application-date">Applied on {new Date(application.createdAt).toLocaleDateString()}</div>
                                </div>

                                {/* STATUS / ACTION */}
                                <div className="application-actions">
                                    {/* STATUS */}
                                    <span className={`status-badge ${application.status === "Approved" ? "approved" : application.status === "Rejected" ? "rejected" : "pending"}`}>{application.status}</span>

                                    {/* BUTTONS */}
                                    {application.status === "Pending" && (
                                        <div className="action-buttons">
                                            <button className="approve-btn" onClick={() => handleApprove(application._id)} disabled={processingId === application._id}>
                                                {processingId === application._id ? "Processing..." : "✓ Approve"}
                                            </button>

                                            <button className="reject-btn" onClick={() => handleReject(application._id)} disabled={processingId === application._id}>
                                                ✕ Reject
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
export default AdminApplications;
