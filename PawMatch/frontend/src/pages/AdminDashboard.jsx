import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import "../CSS/AdminDashboard.css";

function AdminDashboard() {
    const navigate = useNavigate();

    // 定义 stats 状态，用来存储 4 项核心统计数据，默认全为 0
    const [stats, setStats] = useState({
        users: 0,
        pets: 0,
        submissions: 0,
        applications: 0,
    });

    // 定义 loading 状态，用来表示数据是否正在加载（默认 true）
    const [loading, setLoading] = useState(true);

    //get token
    const token = localStorage.getItem("token");

    const fetchStats = async () => {
        try {
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const [usersResponse, petsResponse, submissionsResponse, applicationsResponse] = await Promise.all([
                axios.get(`${import.meta.env.VITE_API_URL}/users/count`, { headers }),

                axios.get(`${import.meta.env.VITE_API_URL}/pets/count`, { headers }),

                axios.get(`${import.meta.env.VITE_API_URL}/pet-submissions/count`, { headers }),

                axios.get(`${import.meta.env.VITE_API_URL}/adoption-applications/count`, { headers }),
            ]);
            // 使用 Promise.all 同时并行发送 4 个请求（用户总数、宠物总数、待审核宠物提交数、待审核领养申请数），提高加载速度

            setStats({
                users: usersResponse.data.count,
                pets: petsResponse.data.count,
                submissions: submissionsResponse.data.count,
                applications: applicationsResponse.data.count,
            });
            // 当 4 个请求全部成功后，更新 stats 状态
        } catch (error) {
            console.log("Get Dashboard Stats Error:", error);

            alert(error.response?.data?.message || "Failed to load dashboard statistics");
        } finally {
            setLoading(false);
            // 无论成功或失败，结束加载状态（将 loading 设置为 false）
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    // 登出函数：清除本地存储的 token 和 role，然后跳转回登录页面
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
                            {/* 如果正在加载，显示 "..."；加载完成显示具体数字 */}
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
