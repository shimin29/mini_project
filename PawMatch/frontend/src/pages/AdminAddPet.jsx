import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
function AdminAddPet() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", type: "", breed: "", gender: "Male", age: "", healthStatus: "Healthy", adoptionStatus: "Available", image: "", description: "" });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            await axios.post("http://localhost:3000/pets", formData, { headers: { Authorization: `Bearer ${token}` } });
            alert("Pet added successfully!");
            navigate("/admin/pets");
        } catch (error) {
            console.log("Add Pet Error:", error);
            alert(error.response?.data?.message || "Failed to add pet");
        }
    };
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };
    return (
        <div className="admin-add-pet-page">
            {" "}
            {/* Navbar */}{" "}
            <nav className="admin-navbar">
                {" "}
                <div className="admin-logo" onClick={() => navigate("/admin/dashboard")}>
                    {" "}
                    🐾 PawMatch <span>Admin</span>{" "}
                </div>{" "}
                <button className="admin-logout-btn" onClick={handleLogout}>
                    {" "}
                    Logout{" "}
                </button>{" "}
            </nav>{" "}
            {/* Main */}{" "}
            <main className="admin-form-container">
                {" "}
                {/* Back */}{" "}
                <button className="back-to-pets" onClick={() => navigate("/admin/pets")}>
                    {" "}
                    ← Back to Manage Pets{" "}
                </button>{" "}
                {/* Header */}{" "}
                <div className="admin-form-header">
                    {" "}
                    <p>ADMIN PANEL</p>{" "}
                    <h1>
                        {" "}
                        Add <span>New Pet</span>{" "}
                    </h1>{" "}
                    <span> Add a new companion to the PawMatch adoption platform. </span>{" "}
                </div>{" "}
                {/* Form */}{" "}
                <form className="admin-pet-form" onSubmit={handleSubmit}>
                    {" "}
                    <div className="form-section-title">
                        {" "}
                        <span>🐾</span>{" "}
                        <div>
                            {" "}
                            <h2>Pet Information</h2> <p>Enter the basic information about the pet.</p>{" "}
                        </div>{" "}
                    </div>{" "}
                    {/* Name + Type */}{" "}
                    <div className="form-row">
                        {" "}
                        <div className="form-group">
                            {" "}
                            <label> Pet Name </label> <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Max" required />{" "}
                        </div>{" "}
                        <div className="form-group">
                            {" "}
                            <label> Animal Type </label> <input type="text" name="type" value={formData.type} onChange={handleChange} placeholder="e.g. Dog, Cat, Rabbit" required />{" "}
                        </div>{" "}
                    </div>{" "}
                    {/* Breed + Gender */}{" "}
                    <div className="form-row">
                        {" "}
                        <div className="form-group">
                            {" "}
                            <label> Breed </label> <input type="text" name="breed" value={formData.breed} onChange={handleChange} placeholder="e.g. Golden Retriever" required />{" "}
                        </div>{" "}
                        <div className="form-group">
                            {" "}
                            <label> Gender </label>{" "}
                            <select name="gender" value={formData.gender} onChange={handleChange}>
                                {" "}
                                <option value="Male"> Male </option> <option value="Female"> Female </option>{" "}
                            </select>{" "}
                        </div>{" "}
                    </div>{" "}
                    {/* Age + Health */}{" "}
                    <div className="form-row">
                        {" "}
                        <div className="form-group">
                            {" "}
                            <label> Age </label> <input type="number" name="age" value={formData.age} onChange={handleChange} min="0" placeholder="e.g. 2" required />{" "}
                        </div>{" "}
                        <div className="form-group">
                            {" "}
                            <label> Health Status </label>{" "}
                            <select name="healthStatus" value={formData.healthStatus} onChange={handleChange}>
                                {" "}
                                <option value="Healthy"> Healthy </option> <option value="Under Treatment"> Under Treatment </option> <option value="Special Needs"> Special Needs </option>{" "}
                            </select>{" "}
                        </div>{" "}
                    </div>{" "}
                    {/* Adoption Status */}{" "}
                    <div className="form-group">
                        {" "}
                        <label> Adoption Status </label>{" "}
                        <select name="adoptionStatus" value={formData.adoptionStatus} onChange={handleChange}>
                            {" "}
                            <option value="Available"> Available </option> <option value="Pending"> Pending </option> <option value="Adopted"> Adopted </option>{" "}
                        </select>{" "}
                    </div>{" "}
                    {/* Image */}{" "}
                    <div className="form-group">
                        {" "}
                        <label> Image URL </label> <input type="url" name="image" value={formData.image} onChange={handleChange} placeholder="https://example.com/pet.jpg" required /> <small> Use a direct URL to the pet image. </small>{" "}
                    </div>{" "}
                    {/* Description */}{" "}
                    <div className="form-group">
                        {" "}
                        <label> Description </label> <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Tell potential adopters about this pet..." rows="5" required />{" "}
                    </div>{" "}
                    {/* Actions */}{" "}
                    <div className="admin-form-actions">
                        {" "}
                        <button type="button" className="cancel-pet-btn" onClick={() => navigate("/admin/pets")}>
                            {" "}
                            Cancel{" "}
                        </button>{" "}
                        <button type="submit" className="save-pet-btn">
                            {" "}
                            🐾 Add Pet{" "}
                        </button>{" "}
                    </div>{" "}
                </form>{" "}
            </main>{" "}
        </div>
    );
}
export default AdminAddPet;
