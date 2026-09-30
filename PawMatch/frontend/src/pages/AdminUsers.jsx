import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:3000/users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Users:", response.data);
            setUsers(response.data);
        } catch (error) {
            console.log("Get Users Error:", error);

            alert(error.response?.data?.message || "Failed to get users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id, name) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${name}?`);

        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:3000/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert("User deleted successfully!");

            fetchUsers();
        } catch (error) {
            console.log("Delete User Error:", error);

            alert(error.response?.data?.message || "Failed to delete user");
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
                <p>Loading users...</p>
            </div>
        );
    }

    return (
        <div className="admin-users-page">
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
            <main className="admin-users-container">
                {/* Header */}
                <div className="admin-users-header">
                    <button className="back-to-pets" onClick={() => navigate("/admin/dashboard")}>
                        ← Back to Dashboard
                    </button>

                    <p className="admin-section-label">ADMIN PANEL</p>

                    <h1>
                        Manage <span>Users</span>
                    </h1>

                    <p className="admin-section-description">View and manage users registered on PawMatch.</p>
                </div>

                {/* User Count */}
                <div className="users-summary">
                    <div className="users-summary-icon">👥</div>

                    <div>
                        <span>Total Users</span>
                        <strong>{users.length}</strong>
                    </div>
                </div>

                {/* Empty */}
                {users.length === 0 ? (
                    <div className="no-admin-users">
                        <div className="empty-icon">👥</div>

                        <h2>No Users Found</h2>

                        <p>There are currently no users in the system.</p>
                    </div>
                ) : (
                    <div className="admin-users-table-wrapper">
                        <table className="admin-users-table">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Joined</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        {/* User */}
                                        <td>
                                            <div className="user-info">
                                                <div className="user-avatar">{user.name?.charAt(0).toUpperCase()}</div>

                                                <div>
                                                    <strong>{user.name}</strong>

                                                    <span>User ID: {user._id.slice(-6)}</span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Email */}
                                        <td>
                                            <span className="user-email">{user.email}</span>
                                        </td>

                                        {/* Role */}
                                        <td>
                                            <span className={`user-role ${user.role}`}>{user.role === "admin" ? " Admin" : " User"}</span>
                                        </td>

                                        {/* Joined */}
                                        <td>
                                            <span className="user-date">
                                                {user.createdAt
                                                    ? new Date(user.createdAt).toLocaleDateString("en-MY", {
                                                          day: "2-digit",
                                                          month: "short",
                                                          year: "numeric",
                                                      })
                                                    : "-"}
                                            </span>
                                        </td>

                                        {/* Action */}
                                        <td>
                                            {user.role === "admin" ? (
                                                <span className="protected-user">🔒 Protected</span>
                                            ) : (
                                                <button className="delete-user-btn" onClick={() => handleDelete(user._id, user.name)}>
                                                    🗑 Delete
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
}

export default AdminUsers;
