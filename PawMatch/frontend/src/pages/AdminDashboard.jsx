import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import "../CSS/AdminDashboard.css";

function AdminDashboard() {
    const navigate = useNavigate();

    const [stats, setStats] = useState({
        users: 0,
        pets: 0,
        submissions: 0,
        applications: 0,
    });

    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    const fetchStats = async () => {
        try {
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const [usersResponse, petsResponse, submissionsResponse, applicationsResponse] = await Promise.all([
                axios.get("http://localhost:3000/users/count", { headers }),

                axios.get("http://localhost:3000/pets/count", { headers }),

                axios.get("http://localhost:3000/pet-submissions/count", { headers }),

                axios.get("http://localhost:3000/adoption-applications/count", { headers }),
            ]);

            setStats({
                users: usersResponse.data.count,
                pets: petsResponse.data.count,
                submissions: submissionsResponse.data.count,
                applications: applicationsResponse.data.count,
            });
        } catch (error) {
            console.log("Get Dashboard Stats Error:", error);

            alert(error.response?.data?.message || "Failed to load dashboard statistics");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/login");
    };

    return (
        <div className="admin-page">
            {/* Navbar */}
            <Navbar role="admin" />

            {/* Dashboard */}
            <main className="admin-dashboard">
                <div className="admin-heading">
                    <p>ADMIN PANEL</p>

                    <h1>Admin Dashboard</h1>

                    <span>Manage PawMatch from one place.</span>
                </div>

                {/* Statistics */}
                <div className="admin-stats-container">
                    {/* Users */}
                    <div className="admin-stat-card">
                        <div className="admin-stat-icon">👥</div>

                        <div>
                            <p>Total Users</p>

                            <h2>{loading ? "..." : stats.users}</h2>
                        </div>
                    </div>

                    {/* Pets */}
                    <div className="admin-stat-card">
                        <div className="admin-stat-icon">🐶</div>

                        <div>
                            <p>Total Pets</p>

                            <h2>{loading ? "..." : stats.pets}</h2>
                        </div>
                    </div>

                    {/* Submissions */}
                    <div className="admin-stat-card">
                        <div className="admin-stat-icon">🐾</div>

                        <div>
                            <p>Pending Submissions</p>

                            <h2>{loading ? "..." : stats.submissions}</h2>
                        </div>
                    </div>

                    {/* Applications */}
                    <div className="admin-stat-card">
                        <div className="admin-stat-icon">❤️</div>

                        <div>
                            <p>Pending Applications</p>

                            <h2>{loading ? "..." : stats.applications}</h2>
                        </div>
                    </div>
                </div>

                {/* Management Cards */}
                <div className="admin-card-container">
                    {/* Pet Submissions */}
                    <div className="admin-card" onClick={() => navigate("/admin/submissions")}>
                        <div className="admin-card-icon">🐾</div>

                        <div>
                            <h2>Pet Submissions</h2>

                            <p>Review and manage pet submissions.</p>
                        </div>

                        <span className="admin-card-arrow">→</span>
                    </div>

                    {/* Adoption Applications */}
                    <div className="admin-card" onClick={() => navigate("/admin/applications")}>
                        <div className="admin-card-icon">❤️</div>

                        <div>
                            <h2>Adoption Applications</h2>

                            <p>Review user adoption applications.</p>
                        </div>

                        <span className="admin-card-arrow">→</span>
                    </div>

                    {/* Manage Pets */}
                    <div className="admin-card" onClick={() => navigate("/admin/pets")}>
                        <div className="admin-card-icon">🐶</div>

                        <div>
                            <h2>Manage Pets</h2>

                            <p>View and manage available pets.</p>
                        </div>

                        <span className="admin-card-arrow">→</span>
                    </div>

                    {/* Manage Users */}
                    <div className="admin-card" onClick={() => navigate("/admin/users")}>
                        <div className="admin-card-icon">👥</div>

                        <div>
                            <h2>Manage Users</h2>

                            <p>View and manage PawMatch users.</p>
                        </div>

                        <span className="admin-card-arrow">→</span>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AdminDashboard;
