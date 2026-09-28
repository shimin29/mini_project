import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // 💡 Add your login / authentication logic here
        console.log("Form submitted:", { email, password });
        try {
            const response = await axios.post("http://localhost:3000/users/login", {
                email,
                password,
            });
            localStorage.setItem("token", response.data.token);
            navigate("/home");
            console.log(response.data);
            alert("Login Successful!");
        } catch (error) {
            console.log("Login Error: ", error);
        }
    };

    return (
        <div className="login-wrapper">
            <form onSubmit={handleLogin} className="login-card">
                <h2>Welcome Back</h2>

                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" required />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
                </div>

                <button type="submit" className="login-btn">
                    Login
                </button>
                <p className="register-link">
                    Don't have an account? <Link to="/register">Register</Link>
                </p> 
            </form>
        </div>
    );
}

export default Login;
