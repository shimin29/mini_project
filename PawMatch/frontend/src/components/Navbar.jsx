import { useNavigate, useLocation } from "react-router";
import "./Navbar.css";

function Navbar({ role }) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    // =========================
    // USER NAVBAR
    // =========================
    if (role === "user") {
        return (
            <nav className="navbar">
                <div className="logo-container" onClick={() => navigate("/home")}>
                    <div className="logo">🐾 PawMatch</div>

                    <span className="nav-subtitle">Find. Match. Adopt.</span>
                </div>

                <div className="nav-links">
                    <button className={`nav-link-btn ${location.pathname === "/home" ? "active" : ""}`} onClick={() => navigate("/home")}>
                        Home
                    </button>
                    <button className={`nav-link-btn ${location.pathname === "/pet" ? "active" : ""}`} onClick={() => navigate("/pet")}>
                        Pets
                    </button>
                    <button className={`nav-link-btn ${location.pathname === "/my-applications" ? "active" : ""}`} onClick={() => navigate("/my-applications")}>
                        My Applications
                    </button>
                    <button className={`nav-link-btn ${location.pathname === "/submit-pet" ? "active" : ""}`} onClick={() => navigate("/submit-pet")}>
                        🐾 Submit Pet
                    </button>
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>
        );
    }

    // =========================
    // ADMIN NAVBAR
    // =========================
    return (
        <nav className="admin-navbar">
            {/* LOGO */}
            <div className="admin-logo" onClick={() => navigate("/admin/dashboard")}>
                🐾 PawMatch
                <span>Admin</span>
            </div>

            {/* ADMIN LINKS */}
            <div className="admin-nav-links">
                <button className={location.pathname === "/admin/dashboard" ? "admin-nav-btn active" : "admin-nav-btn"} onClick={() => navigate("/admin/dashboard")}>
                    Dashboard
                </button>

                <button className={location.pathname === "/admin/pets" ? "admin-nav-btn active" : "admin-nav-btn"} onClick={() => navigate("/admin/pets")}>
                    Pets
                </button>

                {/* ADD PET BUTTON */}
                <button className="admin-add-pet-btn" onClick={() => navigate("/admin/pets/add")}>
                    + Add Pet
                </button>

                <button className={location.pathname === "/admin/submissions" ? "admin-nav-btn active" : "admin-nav-btn"} onClick={() => navigate("/admin/submissions")}>
                    Pet Submissions
                </button>

                <button className={location.pathname === "/admin/applications" ? "admin-nav-btn active" : "admin-nav-btn"} onClick={() => navigate("/admin/applications")}>
                    Adoption Applications
                </button>

                <button className={location.pathname === "/admin/users" ? "admin-nav-btn active" : "admin-nav-btn"} onClick={() => navigate("/admin/users")}>
                    Users
                </button>
            </div>

            {/* LOGOUT */}
            <button className="admin-logout-btn" onClick={handleLogout}>
                Logout
            </button>
        </nav>
    );
}

export default Navbar;
