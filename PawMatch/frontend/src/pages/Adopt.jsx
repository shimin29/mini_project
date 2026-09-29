import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

function Adopt() {
    const { petId } = useParams();
    const navigate = useNavigate();

    const [reason, setReason] = useState("");
    const [experience, setExperience] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            const response = await axios.post(
                "http://localhost:3000/adoption-applications",
                {
                    petId,
                    reason,
                    experience,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            console.log(response.data);

            alert("Adoption application submitted!");

            navigate("/pet");
        } catch (error) {
            console.log("Adoption Application Error:", error);
            console.log("Response:", error.response?.data);

            alert(error.response?.data?.message || "Failed to submit adoption application");
        }
        navigate("/pet");
    };

    return (
        <div>
            <h1>Adoption Application</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Why do you want to adopt this pet?</label>

                    <textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Enter your reason..." required />
                </div>

                <div>
                    <label>Your pet experience</label>

                    <textarea value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="Tell us about your experience with pets..." required />
                </div>

                <button type="submit">Submit Application</button>
            </form>
        </div>
    );
}

export default Adopt;
