import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Pet from "./pages/Pet";
import Home from "./pages/Home";
import SubmitPet from "./pages/SubmitPet";
import AdminSubmissions from "./pages/AdminSubmissions";
import Adopt from "./pages/Adopt";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/pet" element={<Pet />} />
                <Route path="/home" element={<Home />} />
                <Route path="/submit-pet" element={<SubmitPet />} />
                <Route path="/admin/submissions" element={<AdminSubmissions />} />
                <Route path="/adopt/:petId" element={<Adopt />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
