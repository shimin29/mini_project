import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import "../CSS/AdminUsers.css";

function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    // GET ALL USERS
    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // 发送 GET 请求获取所有用户列表，并在请求头中携带凭证 Token
            console.log("Users:", response.data);
            setUsers(response.data);
            // 将返回的用户数据保存到 users 状态中
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

    // DELETE USER
    const handleDelete = async (id, name) => {
        // 接收要删除的用户 id 和 name
        const confirmDelete = window.confirm(`Are you sure you want to delete ${name}?`);

        if (!confirmDelete) return;

        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // 发送 DELETE 请求删除指定 ID 的用户

            alert("User deleted successfully!");

            fetchUsers();
            // 重新刷新获取最新的用户列表
        } catch (error) {
            console.log("Delete User Error:", error);

            alert(error.response?.data?.message || "Failed to delete user");
        }
    };

    // LOADING
    if (loading) {
        return (
            <div className="admin-users-loading">
                <div className="loading-spinner"></div>
                <p>Loading users...</p>
            </div>
        );
    }

    return (
        <div className="admin-users-page">
            <Navbar role="admin" />

            <main className="admin-users-container">
                {/* HEADER */}
                <div className="admin-users-header">
                    <button className="back-to-dashboard" onClick={() => navigate("/admin/dashboard")}>
                        ← Back to Dashboard
                    </button>

                    <p className="admin-section-label">ADMIN PANEL</p>

                    <h1>
                        Manage <span>Users</span>
                    </h1>

                    <p className="admin-section-description">View and manage users registered on PawMatch.</p>
                </div>

                {/* SUMMARY */}
                <div className="users-summary">
                    <div className="users-summary-icon">👥</div>

                    <div className="users-summary-content">
                        <span>Total Users</span>
                        <strong>{users.length}</strong>
                    </div>
                </div>

                {/* EMPTY STATE */}
                {users.length === 0 ? (
                    <div className="no-admin-users">
                        <div className="empty-icon">👥</div>

                        <h2>No Users Found</h2>

                        <p>There are currently no users in the system.</p>
                    </div>
                ) : (
                    /* USER TABLE */
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
                                    // 使用 map 循环渲染每一个用户数据行，绑定 key 为 user._id
                                    <tr key={user._id}>
                                        {/* USER */}
                                        <td>
                                            <div className="user-info">
                                                {/* 截取名字的第一个字符转大写作为头像 */}
                                                <div className="user-avatar">{user.name?.charAt(0).toUpperCase()}</div>
                                                <div className="user-name-container">
                                                    <strong>{user.name}</strong>
                                                    {/* 显示 MongoDB ID 的最后 6 位 */}
                                                    <span>User ID: {user._id.slice(-6)}</span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* EMAIL */}
                                        <td>
                                            <span className="user-email">{user.email}</span>
                                        </td>

                                        {/* ROLE */}
                                        <td>
                                            {/* 这个是显示是admin 或者 user 的一个小title */}
                                            <span className={`user-role ${user.role}`}>{user.role === "admin" ? "Admin" : "User"}</span>
                                        </td>

                                        {/* JOINED */}
                                        <td>
                                            <span className="user-date">
                                                {/*user.createdAt 是否存在 */}
                                                {user.createdAt
                                                    ? new Date(user.createdAt).toLocaleDateString("en-MY", {
                                                          day: "2-digit", // 天数显示为两位数，例如 "05"
                                                          month: "short", // 月份显示为简写，例如 "Oct"
                                                          year: "numeric", // 年份显示为完整数字，例如 "2026"
                                                      })
                                                    : "-"}
                                                {/* 如果 createdAt 不存在（例如旧数据），则只显示 "-" */}
                                            </span>
                                        </td>

                                        {/* ACTION */}
                                        <td>
                                            {user.role === "admin" ? (
                                                // 如果是管理员，为了系统安全，不允许删除，显示锁定的受保护标签
                                                <span className="protected-user">🔒 Protected</span>
                                            ) : (
                                                // 如果是普通用户，渲染删除按钮，点击时调用 handleDelete 函数并传入用户 ID 和名字
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
