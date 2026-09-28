function Home() {
    return (
        <div className="home-page">
            {/* Navbar */}
            <nav className="navbar">
                <div className="logo">🐾 PawMatch</div>

                <div className="nav-links">
                    <a href="/home">Home</a>
                    <a href="/pet">Pets</a>
                    <a href="/login">Logout</a>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <p className="hero-small-title">FIND YOUR PERFECT COMPANION</p>

                    <h1>
                        Find Your
                        <span> Perfect Pet Match</span>
                    </h1>

                    <p className="hero-description">Discover loving pets looking for a forever home. PawMatch helps you find a companion that matches your lifestyle.</p>

                    <a href="/pet" className="hero-btn">
                        Find Pets
                    </a>
                </div>
            </section>

            {/* Why Choose PawMatch */}
            <section className="why-section">
                <div className="section-heading">
                    <p className="section-small-title">WHY PAWMATCH?</p>

                    <h2>Why Choose PawMatch?</h2>

                    <p>We make finding your perfect companion simple, safe and enjoyable.</p>
                </div>

                <div className="feature-container">
                    <div className="feature-card">
                        <div className="feature-icon">🐶</div>

                        <h3>Find Your Match</h3>

                        <p>Discover pets that match your lifestyle and preferences.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">❤️</div>

                        <h3>Loving Companions</h3>

                        <p>Find wonderful pets looking for a loving forever home.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">🏠</div>

                        <h3>Easy Adoption</h3>

                        <p>Make the adoption journey simple and enjoyable.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">🔒</div>

                        <h3>Safe & Trusted</h3>

                        <p>Browse pet profiles in a friendly and secure environment.</p>
                    </div>
                </div>
            </section>

            {/* Popular Pets */}
            <section className="pets-section">
                <div className="section-heading">
                    <p className="section-small-title">MEET OUR PETS</p>

                    <h2>Popular Pets</h2>

                    <p>Meet some adorable pets waiting for their perfect match.</p>
                </div>

                <div className="pets-container">
                    <div className="pet-card">
                        <div className="pet-image">🐶</div>

                        <div className="pet-info">
                            <h3>Buddy</h3>

                            <p>Golden Retriever · 2 years</p>

                            {/* <button>View Profile</button> */}
                        </div>
                    </div>

                    <div className="pet-card">
                        <div className="pet-image">🐱</div>

                        <div className="pet-info">
                            <h3>Luna</h3>

                            <p>British Shorthair · 1 year</p>

                            {/* <button>View Profile</button> */}
                        </div>
                    </div>

                    <div className="pet-card">
                        <div className="pet-image">🐰</div>

                        <div className="pet-info">
                            <h3>Coco</h3>

                            <p>Holland Lop · 8 months</p>

                            {/* <button>View Profile</button> */}
                        </div>
                    </div>
                </div>

                <div className="view-all-container">
                    <a href="/pet" className="view-all-btn">
                        View All Pets
                    </a>
                </div>
            </section>
        </div>
    );
}

export default Home;
