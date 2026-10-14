import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import "../CSS/Pet.css";

function Pet() {
    const navigate = useNavigate();

    const [pets, setPets] = useState([]);
    // 存储所有宠物数据
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    // 筛选与搜索状态
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("All");
    const [genderFilter, setGenderFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("Available");

    // Get all pets
    const fetchPets = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/pets`);
            console.log("Pets:", response.data);

            setPets(response.data);
        } catch (error) {
            console.log("Get Pets Error:", error);
        }
    };

    // Get current user's applications
    const fetchApplications = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                return;
            } // 未登录则不发送请求

            const response = await axios.get("http://localhost:3000/adoption-applications/my", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("My Applications:", response.data);

            setApplications(response.data);
        } catch (error) {
            console.log("Get Applications Error:", error);
        }
    };

    // Load pets + applications - 使用 Promise.all 并发请求
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);

            await Promise.all([fetchPets(), fetchApplications()]);

            setLoading(false);
        };

        loadData();
    }, []);

    // Get application for current pet - 查找当前用户是否对特定宠物提交过申请
    const getPetApplication = (petId) => {
        return applications.find((application) => {
            // 兼容 petId 是对象（Populated）或纯 ID 字符串的情况
            const applicationPetId = typeof application.petId === "object" ? application.petId?._id : application.petId;

            return applicationPetId === petId;
        });
    };

    // Get application status text - 获取卡片上显示的申请状态文字与图标
    const getApplicationStatus = (pet) => {
        // Pet already adopted
        if (pet.adoptionStatus === "Adopted") {
            return "🏠 Already Adopted";
        } // 已经被其他人领养

        // Find user's application
        const application = getPetApplication(pet._id);

        // No application
        if (!application) {
            return "❤️ Not Applied";
        } // 用户未申请过此宠物

        // Pending
        if (application.status === "Pending") {
            return "⏳ Application Pending";
        } // 申请审核中

        // Approved
        if (application.status === "Approved") {
            return "✅ Application Approved";
        } // 申请已通过

        // Rejected
        if (application.status === "Rejected") {
            return "❌ Application Rejected";
        } // 申请已被拒绝

        return "❤️ Not Applied";
    };

    // Get application status class
    const getApplicationStatusClass = (pet) => {
        if (pet.adoptionStatus === "Adopted") {
            return "application-adopted";
        }

        const application = getPetApplication(pet._id);

        if (!application) {
            return "application-not-applied";
        }

        if (application.status === "Pending") {
            return "application-pending";
        }

        if (application.status === "Approved") {
            return "application-approved";
        }

        if (application.status === "Rejected") {
            return "application-rejected";
        }

        return "application-not-applied";
    };

    // Search + Filter
    const filteredPets = pets.filter((pet) => {
        const searchText = search.toLowerCase();
        // 匹配搜索框（名字、品种或类型）
        const matchesSearch = pet.name.toLowerCase().includes(searchText) || pet.breed.toLowerCase().includes(searchText) || pet.type.toLowerCase().includes(searchText);
        // 匹配类型下拉菜单
        const matchesType = typeFilter === "All" || pet.type.toLowerCase() === typeFilter.toLowerCase();
        // 匹配性别下拉菜单
        const matchesGender = genderFilter === "All" || pet.gender === genderFilter;
        // 匹配领养状态下拉菜单
        const matchesStatus = statusFilter === "All" || pet.adoptionStatus === statusFilter;
        // 必须同时满足上述 4 个条件
        return matchesSearch && matchesType && matchesGender && matchesStatus;
    });

    // Get unique pet types - 动态提取数据库中所有宠物不重复的类型（如 Dog, Cat, Rabbit），用于下拉框菜单
    const petTypes = ["All", ...new Set(pets.map((pet) => pet.type))];

    return (
        <div className="pet-page">
            {/* Navbar */}
            <Navbar role="user" />

            {/* Page Header */}
            <section className="pet-page-header">
                <p className="section-small-title">FIND YOUR COMPANION</p>

                <h1>Find Your Perfect Pet</h1>

                <p>Browse our lovely pets and find the perfect companion for your family.</p>
            </section>

            {/* Filters */}
            <section className="pet-filter-section">
                {/* Search */}
                <div className="search-box">
                    <span>🔍</span>

                    <input type="text" placeholder="Search by name, breed or type..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>

                {/* Type */}
                <div className="filter-group">
                    <label>Type</label>

                    <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                        {petTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Gender */}
                <div className="filter-group">
                    <label>Gender</label>

                    <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
                        <option value="All">All</option>

                        <option value="Male">Male</option>

                        <option value="Female">Female</option>
                    </select>
                </div>

                {/* Status */}
                <div className="filter-group">
                    <label>Status</label>

                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="All">All</option>

                        <option value="Available">Available</option>

                        <option value="Pending">Pending</option>

                        <option value="Adopted">Adopted</option>
                    </select>
                </div>
            </section>

            {/* Results */}
            <main className="pet-list-section">
                <div className="pet-list-heading">
                    <div>
                        <p className="section-small-title">OUR PETS</p>

                        <h2>Available Companions</h2>
                    </div>

                    <span>{filteredPets.length} pets found</span>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="pet-message">
                        <div className="pet-message-icon">🐾</div>

                        <h3>Loading pets...</h3>

                        <p>Please wait while we find your perfect companion.</p>
                    </div>
                )}

                {/* No Pets */}
                {!loading && filteredPets.length === 0 && (
                    <div className="pet-message">
                        <div className="pet-message-icon">🐾</div>

                        <h3>No pets found</h3>

                        <p>Try changing your search or filters.</p>
                    </div>
                )}

                {/* Pet Cards */}
                {!loading && filteredPets.length > 0 && (
                    <div className="pet-grid">
                        {filteredPets.map((pet) => {
                            const applicationStatus = getApplicationStatus(pet);

                            const applicationClass = getApplicationStatusClass(pet);

                            return (
                                <div className="pet-list-card" key={pet._id}>
                                    {/* Image */}
                                    <div className="pet-list-image">
                                        <img src={pet.image} alt={pet.name} />

                                        <span className={`pet-status ${pet.adoptionStatus.toLowerCase().replace(" ", "-")}`}>{pet.adoptionStatus}</span>
                                    </div>

                                    {/* Info */}
                                    <div className="pet-list-info">
                                        <h3>{pet.name}</h3>

                                        <p className="pet-breed">{pet.breed}</p>

                                        <div className="pet-details">
                                            <span>🐾 {pet.type}</span>

                                            <span>
                                                {pet.gender === "Male" ? "♂" : "♀"} {pet.gender}
                                            </span>

                                            <span>🎂 {pet.age} years</span>
                                        </div>

                                        <div className="pet-health">
                                            <span>Health:</span>

                                            <strong>{pet.healthStatus}</strong>
                                        </div>

                                        {/* Application Status */}
                                        <div className={`pet-application-status ${applicationClass}`}>{applicationStatus}</div>

                                        {/* View Profile */}
                                        <button className="view-pet-btn" onClick={() => navigate(`/pet/${pet._id}`)}>
                                            View Profile →
                                        </button>
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

export default Pet;
