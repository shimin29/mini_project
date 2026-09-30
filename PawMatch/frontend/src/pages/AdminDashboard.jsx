import { useNavigate } from "react-router";

function AdminDashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (
        <div className="admin-page">
            {/* Navbar */}
            <nav className="admin-navbar">
                <div className="admin-logo">
                    🐾 PawMatch
                    <span>Admin</span>
                </div>

                <button className="admin-logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </nav>

            {/* Dashboard */}
            <main className="admin-dashboard">
                <div className="admin-heading">
                    <p>ADMIN PANEL</p>
                    <h1>Admin Dashboard</h1>
                    <span>Manage PawMatch from one place.</span>
                </div>

                {/* Dashboard Cards */}
                <div className="admin-card-container">
                    <div className="admin-card" onClick={() => navigate("/admin/submissions")}>
                        <div className="admin-card-icon">🐾</div>

                        <div>
                            <h2>Pet Submissions</h2>
                            <p>Review and manage pet submissions.</p>
                        </div>

                        <span className="admin-card-arrow">→</span>
                    </div>

                    <div className="admin-card" onClick={() => navigate("/admin/applications")}>
                        <div className="admin-card-icon">❤️</div>

                        <div>
                            <h2>Adoption Applications</h2>
                            <p>Review user adoption applications.</p>
                        </div>

                        <span className="admin-card-arrow">→</span>
                    </div>

                    <div className="admin-card" onClick={() => navigate("/admin/pets")}>
                        <div className="admin-card-icon">🐶</div>

                        <div>
                            <h2>Manage Pets</h2>
                            <p>View and manage available pets.</p>
                        </div>

                        <span className="admin-card-arrow">→</span>
                    </div>

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
