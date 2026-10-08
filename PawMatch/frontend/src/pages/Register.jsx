import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import "../CSS/Register.css";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/users/register", {
                name,
                email,
                password,
            });

            console.log("Register Response:", response.data);

            alert("Registration Successful!");

            navigate("/login");
        } catch (error) {
            console.log("Register Error:", error);

            alert(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="register-page">
            <div className="register-card">
                {/* LOGO */}
                <div className="register-logo">🐾</div>

                <p className="register-brand-name">PAWMATCH</p>

                {/* HEADER */}
                <div className="register-header">
                    <h1>Create Your Account</h1>

                    <p>Join PawMatch and start your journey to find a loving companion.</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleRegister}>
                    {/* NAME */}
                    <div className="register-form-group">
                        <label htmlFor="name">Full Name</label>

                        <div className="register-input-wrapper">
                            <span>👤</span>

                            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" required />
                        </div>
                    </div>

                    {/* EMAIL */}
                    <div className="register-form-group">
                        <label htmlFor="email">Email Address</label>

                        <div className="register-input-wrapper">
                            <span>✉️</span>

                            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" required />
                        </div>
                    </div>

                    {/* PASSWORD */}
                    <div className="register-form-group">
                        <label htmlFor="password">Password</label>

                        <div className="register-input-wrapper">
                            <span>🔒</span>

                            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" required />
                        </div>
                    </div>

                    <p className="password-hint">🔒 Use a strong password to keep your account secure.</p>

                    {/* BUTTON */}
                    <button type="submit" className="register-btn">
                        Create Account
                        <span>→</span>
                    </button>
                </form>

                {/* DIVIDER */}
                <div className="register-divider">
                    <span>OR</span>
                </div>

                {/* LOGIN LINK */}
                <p className="login-link">
                    Already have an account?
                    <Link to="/login">Login</Link>
                </p>

                {/* FOOTER */}
                <p className="register-footer-text">🐾 Every pet deserves a loving home.</p>
            </div>
        </div>
    );
}

export default Register;
