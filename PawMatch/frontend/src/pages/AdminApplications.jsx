import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import "../CSS/AdminApplications.css";

function AdminApplications() {
    const navigate = useNavigate();
    // 定义 applications 状态，用来保存从后端获取到的所有领养申请列表（默认为空数组）
    const [applications, setApplications] = useState([]);
    // 定义 loading 状态，用来控制加载动画的显示（默认处于加载中 true）
    const [loading, setLoading] = useState(true);
    // 定义 processingId 状态，记录当前正在被操作（批准/拒绝）的申请 ID，防止重复点击
    const [processingId, setProcessingId] = useState(null);

    const token = localStorage.getItem("token");

    // GET ALL APPLICATIONS
    const fetchApplications = async () => {
        try {
            setLoading(true);

            const response = await axios.get(`${import.meta.env.VITE_API_URL}/adoption-applications`, {
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
                localStorage.removeItem("role");

                navigate("/login");
            }

            if (error.response?.status === 403) {
                alert("Access denied. Admin only.");

                navigate("/admin/dashboard");
            }
        } finally {
            // 无论成功还是失败，最后都将 loading 设置为 false（隐藏加载动画）
            setLoading(false);
        }
    };

    useEffect(() => {
        //检查有没有token 然后执行指令 没有的话 跳回去login
        if (!token) {
            navigate("/login");
            // 如果没有 Token，直接跳到login
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
                `${import.meta.env.VITE_API_URL}/adoption-applications/${id}/approve`,
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
            // 无论成功失败，重置 processingId，恢复按钮状态
        }
    };

    // REJECT
    const handleReject = async (id) => {
        const confirmReject = window.confirm("Are you sure you want to reject this application?");

        if (!confirmReject) return;

        try {
            setProcessingId(id);

            await axios.put(
                `${import.meta.env.VITE_API_URL}/adoption-applications/${id}/reject`,
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

    // LOADING
    if (loading) {
        return (
            <div className="admin-applications-page">
                <Navbar role="admin" />

                <div className="admin-loading-content">
                    <div className="loading-spinner"></div>

                    <p>Loading applications...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-applications-page">
            {/* NAVBAR */}
            <Navbar role="admin" />

            {/* MAIN */}
            <main className="admin-applications-container">
                {/* BACK */}
                <button className="back-to-dashboard" onClick={() => navigate("/admin/dashboard")}>
                    ← Back to Dashboard
                </button>

                {/* HEADER */}
                <div className="admin-applications-header">
                    <div>
                        <p className="admin-section-label">ADMIN PANEL</p>

                        <h1>
                            Adoption <span>Applications</span>
                        </h1>

                        <p className="admin-section-description">Review and manage adoption applications submitted by PawMatch users.</p>
                    </div>

                    {/* COUNTER */}
                    <div className="application-count">
                        <span>❤️</span>

                        <div>
                            <strong>{applications.length}</strong>

                            <small>Total Applications</small>
                        </div>
                    </div>
                </div>

                {/* SUMMARY */}
                <div className="application-summary">
                    <div>
                        <strong>{applications.filter((item) => item.status === "Pending").length}</strong>

                        <span>Pending</span>
                    </div>

                    <div>
                        <strong>{applications.filter((item) => item.status === "Approved").length}</strong>

                        <span>Approved</span>
                    </div>

                    <div>
                        <strong>{applications.filter((item) => item.status === "Rejected").length}</strong>

                        <span>Rejected</span>
                    </div>
                </div>

                {/* EMPTY */}
                {applications.length === 0 ? (
                    //如果申请列表长度为 0（没有申请）
                    <div className="empty-applications">
                        <div className="empty-icon">🐾</div>

                        <h3>No Applications Yet</h3>

                        <p>There are currently no adoption applications to review.</p>
                    </div>
                ) : (
                    /* APPLICATION LIST */
                    <div className="applications-list">
                        {applications.map((application) => {
                            // .map 循环get data 然后显示每一个申请卡片
                            const pet = application.petId;
                            // 提取申请绑定的宠物数据
                            const applicant = application.applicantId;
                            // 提取申请人的数据

                            return (
                                <div className="application-card" key={application._id}>
                                    {/* PET */}
                                    <div className="pet-section">
                                        {pet?.image ? (
                                            <div className="pet-image-wrapper">
                                                <img src={pet.image} alt={pet.name} className="pet-image" />

                                                <span className="pet-type-badge">{pet.type}</span>
                                            </div>
                                        ) : (
                                            <div className="no-image">🐾</div>
                                        )}

                                        <h3>{pet?.name || "Unknown Pet"}</h3>

                                        <span>{pet?.breed || "Unknown breed"}</span>

                                        {pet && (
                                            <div className="pet-mini-details">
                                                <span>⚧ {pet.gender}</span>

                                                <span>🎂 {pet.age} years</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* APPLICATION INFO */}
                                    <div className="application-info">
                                        {/* APPLICANT */}
                                        <div className="info-section">
                                            <h4>Applicant</h4>

                                            <p className="applicant-name">{applicant?.name || "Unknown"}</p>

                                            <p className="email">{applicant?.email || "No email"}</p>
                                        </div>

                                        {/* REASON */}
                                        <div className="info-section">
                                            <h4>Reason for Adoption</h4>

                                            <p>{application.reason}</p>
                                        </div>

                                        {/* EXPERIENCE */}
                                        <div className="info-section">
                                            <h4>Previous Experience</h4>

                                            <p>{application.experience}</p>
                                        </div>

                                        {/* DATE */}
                                        <div className="application-date">Applied on {new Date(application.createdAt).toLocaleDateString()}</div>
                                    </div>

                                    {/* STATUS / ACTION */}
                                    <div className="application-actions">
                                        <span className={`status-badge ${application.status === "Approved" ? "approved" : application.status === "Rejected" ? "rejected" : "pending"}`}>{application.status}</span>
                                        {/* 如果状态是 Pending（待处理），显示操作按钮 */}
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
                                        {/* 如果已被批准，显示已批准提示 */}
                                        {application.status === "Approved" && <div className="decision-message approved-message">✓ Application approved</div>}
                                        {/* 如果已被拒绝，显示已拒绝提示 */}
                                        {application.status === "Rejected" && <div className="decision-message rejected-message">✕ Application rejected</div>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
}

export default AdminApplications;
