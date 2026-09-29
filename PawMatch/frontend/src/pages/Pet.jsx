import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function Pet() {
    const [pets, setPets] = useState([]);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const fetchPets = async () => {
        try {
            const response = await axios.get("http://localhost:3000/pets");

            console.log("Pets:", response.data);

            setPets(response.data);
        } catch (error) {
            console.log("Get Pets Error:", error);
        }
    };

    const fetchMyApplications = async () => {
        try {
            const response = await axios.get("http://localhost:3000/adoption-applications/my", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("My Applications:", response.data);

            setApplications(response.data);
        } catch (error) {
            console.log("Get My Applications Error:", error);
        }
    };

    const fetchData = async () => {
        setLoading(true);

        await Promise.all([fetchPets(), fetchMyApplications()]);

        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <p>Loading pets...</p>;
    }

    return (
        <div>
            <h1>Available Pets</h1>

            {pets.length === 0 ? (
                <p>No pets available.</p>
            ) : (
                <div>
                    {pets.map((pet) => {
                        // Find current user's application for this pet
                        const application = applications.find((app) => app.petId?._id === pet._id);

                        return (
                            <div key={pet._id}>
                                <img src={pet.image} alt={pet.name} width="200" />

                                <h2>{pet.name}</h2>

                                <p>Type: {pet.type}</p>

                                <p>Breed: {pet.breed}</p>

                                <p>Gender: {pet.gender}</p>

                                <p>Age: {pet.age}</p>

                                <p>Health: {pet.healthStatus}</p>

                                <p>Status: {pet.adoptionStatus}</p>

                                {/* No application */}
                                {!application && <button onClick={() => navigate(`/adopt/${pet._id}`)}>Adopt</button>}

                                {/* Pending */}
                                {application && application.status === "Pending" && <button disabled>Application Pending</button>}

                                {/* Approved */}
                                {application && application.status === "Approved" && <button disabled>Application Approved</button>}

                                {/* Rejected */}
                                {application && application.status === "Rejected" && <button onClick={() => navigate(`/adopt/${pet._id}`)}>Apply Again</button>}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Pet;
