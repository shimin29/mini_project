import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import "../CSS/Home.css";

function Home() {
    const navigate = useNavigate();
    return (
        <div className="home-page">
            {/* Navbar */}
            <Navbar role="user" />
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <p className="hero-small-title"> FIND YOUR PERFECT COMPANION </p>{" "}
                    <h1>
                        Find Your <span> Perfect Pet Match</span>{" "}
                    </h1>
                    <p className="hero-description"> Discover loving pets looking for a forever home. PawMatch helps you find a companion that matches your lifestyle. </p>{" "}
                    <button className="hero-btn" onClick={() => navigate("/pet")}>
                        Find Pets
                    </button>
                </div>
            </section>
            {/* Why Choose PawMatch */}
            <section className="why-section">
                <div className="section-heading">
                    <p className="section-small-title"> WHY PAWMATCH? </p> <h2>Why Choose PawMatch?</h2> <p> We make finding your perfect companion simple, safe and enjoyable. </p>{" "}
                </div>{" "}
                <div className="feature-container">
                    <div className="feature-card">
                        <div className="feature-icon">🐶</div> <h3>Find Your Match</h3> <p> Discover pets that match your lifestyle and preferences. </p>{" "}
                    </div>{" "}
                    <div className="feature-card">
                        <div className="feature-icon">❤️</div> <h3>Loving Companions</h3> <p> Find wonderful pets looking for a loving forever home. </p>{" "}
                    </div>{" "}
                    <div className="feature-card">
                        <div className="feature-icon">🏠</div> <h3>Easy Adoption</h3> <p> Make the adoption journey simple and enjoyable. </p>{" "}
                    </div>{" "}
                    <div className="feature-card">
                        <div className="feature-icon">🔒</div> <h3>Safe & Trusted</h3> <p> Browse pet profiles in a friendly and secure environment. </p>{" "}
                    </div>{" "}
                </div>{" "}
            </section>{" "}
            {/* Call To Action */}{" "}
            <section className="home-cta">
                <div className="cta-content">
                    <h2>Ready to Find Your New Best Friend?</h2> <p> Explore our available pets and take the first step towards adoption. </p>{" "}
                    <button className="cta-btn" onClick={() => navigate("/pet")}>
                        Explore Pets{" "}
                    </button>{" "}
                </div>{" "}
            </section>{" "}
        </div>
    );
}
export default Home;
