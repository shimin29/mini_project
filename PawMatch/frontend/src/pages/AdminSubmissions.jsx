import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function AdminSubmissions() {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const fetchSubmissions = async () => {
        try {
            const response = await axios.get("http://localhost:3000/pet-submissions", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setSubmissions(response.data);
        } catch (error) {
            console.log("Get Submissions Error:", error);

            alert("Failed to get pet submissions");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubmissions();
    }, []);

    // APPROVE

    const handleApprove = async (id) => {
        const confirmApprove = window.confirm("Are you sure you want to approve this pet submission?");

        if (!confirmApprove) {
            return;
        }

        try {
            await axios.put(
                `http://localhost:3000/pet-submissions/${id}/approve`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            alert("Pet submission approved!");

            fetchSubmissions();
        } catch (error) {
            console.log("Approve Error:", error);

            alert(error.response?.data?.message || "Failed to approve submission");
        }
    };

    // REJECT

    const handleReject = async (id) => {
        const confirmReject = window.confirm("Are you sure you want to reject this pet submission?");

        if (!confirmReject) {
            return;
        }

        try {
            await axios.put(
                `http://localhost:3000/pet-submissions/${id}/reject`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            alert("Pet submission rejected!");

            fetchSubmissions();
        } catch (error) {
            console.log("Reject Error:", error);

            alert(error.response?.data?.message || "Failed to reject submission");
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

                <p>Loading submissions...</p>
            </div>
        );
    }

    return (
        <div className="admin-submissions-page">
            {/* NAVBAR */}

            <nav className="admin-navbar">
                <div className="admin-logo" onClick={() => navigate("/admin/dashboard")}>
                    🐾 PawMatch
                    <span>Admin</span>
                </div>

                <button className="admin-logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </nav>

            {/* MAIN */}

            <main className="admin-submissions-container">
                {/* HEADER */}

                <div className="admin-submissions-header">
                    <div>
                        <button className="back-to-pets" onClick={() => navigate("/admin/dashboard")}>
                            ← Back to Dashboard
                        </button>

                        <p className="admin-section-label">ADMIN PANEL</p>

                        <h1>
                            Pet <span>Submissions</span>
                        </h1>

                        <p className="admin-section-description">Review pets submitted by PawMatch users.</p>
                    </div>
                </div>

                {/* EMPTY */}

                {submissions.length === 0 ? (
                    <div className="no-admin-pets">
                        <div className="empty-icon">🐾</div>

                        <h2>No Submissions</h2>

                        <p>There are currently no pet submissions.</p>
                    </div>
                ) : (
                    <div className="admin-submissions-list">
                        {submissions.map((submission) => (
                            <div className="submission-card" key={submission._id}>
                                {/* IMAGE */}

                                <div className="submission-image-wrapper">
                                    <img src={submission.image} alt={submission.name} className="submission-image" />

                                    <span className={`submission-status ${submission.status.toLowerCase()}`}>{submission.status}</span>
                                </div>

                                {/* CONTENT */}

                                <div className="submission-content">
                                    <div className="submission-title">
                                        <div>
                                            <h2>{submission.name}</h2>

                                            <p>{submission.breed}</p>
                                        </div>
                                    </div>

                                    <div className="submission-details">
                                        <span>🐾 {submission.type}</span>

                                        <span>🎂 {submission.age} years</span>

                                        <span>⚧ {submission.gender}</span>
                                    </div>

                                    <div className="submission-health">
                                        <strong>Health:</strong>

                                        <span>{submission.healthStatus}</span>
                                    </div>

                                    {/* OWNER */}

                                    <div className="submission-owner">
                                        <p>Submitted by</p>

                                        <strong>{submission.ownerId?.name || "Unknown User"}</strong>

                                        <span>{submission.ownerId?.email || ""}</span>
                                    </div>

                                    {/* REASON */}

                                    <div className="submission-reason">
                                        <p>Reason for Submission</p>

                                        <span>{submission.reason}</span>
                                    </div>

                                    {/* ACTIONS */}

                                    {submission.status === "Pending" && (
                                        <div className="submission-actions">
                                            <button className="approve-btn" onClick={() => handleApprove(submission._id)}>
                                                ✓ Approve
                                            </button>

                                            <button className="reject-btn" onClick={() => handleReject(submission._id)}>
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

export default AdminSubmissions;
