import { useEffect, useState } from "react";
import axios from "axios";

function AdminSubmissions() {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    // Get all submissions
    const fetchSubmissions = async () => {
        try {
            const response = await axios.get("http://localhost:3000/pet-submissions", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(response.data);

            setSubmissions(response.data);
        } catch (error) {
            console.log("Get Submissions Error:", error);
            console.log("Response:", error.response?.data);

            alert(error.response?.data?.message || "Failed to load submissions");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubmissions();
    }, []);

    // Approve
    const handleApprove = async (id) => {
        try {
            console.log("Approving ID:", id);

            const response = await axios.put(
                `http://localhost:3000/pet-submissions/${id}/approve`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            console.log("Approve Response:", response.data);

            alert("Pet submission approved!");

            fetchSubmissions();
        } catch (error) {
            console.log("Approve Error:", error);
            console.log("Approve URL:", error.config?.url);
            console.log("Response:", error.response?.data);
        }
    };

    // Reject
    const handleReject = async (id) => {
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
            console.log("Response:", error.response?.data);

            alert(error.response?.data?.message || "Failed to reject submission");
        }
    };

    if (loading) {
        return <p>Loading submissions...</p>;
    }

    return (
        <div className="admin-submissions-page">
            <h1>Pet Submissions</h1>

            {submissions.length === 0 ? (
                <p>No pet submissions found.</p>
            ) : (
                <div className="submission-list">
                    {submissions.map((submission) => (
                        <div className="submission-card" key={submission._id}>
                            <img src={submission.image} alt={submission.name} />

                            <div className="submission-info">
                                <h2>{submission.name}</h2>

                                <p>
                                    <strong>Type:</strong> {submission.type}
                                </p>

                                <p>
                                    <strong>Breed:</strong> {submission.breed}
                                </p>

                                <p>
                                    <strong>Gender:</strong> {submission.gender}
                                </p>

                                <p>
                                    <strong>Age:</strong> {submission.age}
                                </p>

                                <p>
                                    <strong>Health:</strong> {submission.healthStatus}
                                </p>

                                <p>
                                    <strong>Reason:</strong> {submission.reason}
                                </p>

                                <p>
                                    <strong>Status:</strong> {submission.status}
                                </p>

                                {submission.ownerId && (
                                    <p>
                                        <strong>Submitted by:</strong> {submission.ownerId.name}
                                    </p>
                                )}

                                {submission.status === "Pending" && (
                                    <div className="submission-actions">
                                        <button onClick={() => handleApprove(submission._id)}>Approve</button>

                                        <button onClick={() => handleReject(submission._id)}>Reject</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AdminSubmissions;
