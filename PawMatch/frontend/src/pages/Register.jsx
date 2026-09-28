import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        console.log("Form submitted:", { name, email, password });
        try {
            const response = await axios.post("http://localhost:3000/users/register", {
                name,
                email,
                password,
            });
            navigate("/login");
            console.log(response.data);
            alert("Register Successful!");
        } catch (error) {
            console.log("Register Error: ", error);
        }
    };

    return (
        <div className="login-wrapper">
            <form onSubmit={handleRegister} className="login-card">
                <h2>Lets Sign Up!</h2>

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" required />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" required />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
                </div>

                <button type="submit" className="login-btn">
                    Sign Up
                </button>
                <p className="register-link">
                    Already have account? <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
}

export default Register;
