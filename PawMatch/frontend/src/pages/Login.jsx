import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import "../CSS/Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/users/login", {
                email,
                password,
            });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.user.role);

            console.log("Login Response:", response.data);

            if (response.data.user.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/home");
            }

            alert("Login Successful!");
        } catch (error) {
            console.log("Login Error:", error);

            alert(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                {/* LOGO */}
                <div className="login-logo">🐾</div>

                <p className="login-brand-name">PAWMATCH</p>

                {/* HEADER */}
                <div className="login-header">
                    <h1>Welcome Back</h1>

                    <p>Login to continue your PawMatch journey.</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>

                        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>

                        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
                    </div>

                    <button type="submit" className="login-btn">
                        Login
                        <span>→</span>
                    </button>
                </form>

                {/* DIVIDER */}
                <div className="login-divider">
                    <span>OR</span>
                </div>

                {/* REGISTER */}
                <p className="register-link">
                    Don't have an account?
                    <Link to="/register">Create an account</Link>
                </p>

                {/* FOOTER */}
                <p className="login-footer-text">🐾 Every pet deserves a loving home.</p>
            </div>
        </div>
    );
}

export default Login;
