import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Pet from "./pages/Pet";
import Home from "./pages/Home";
import SubmitPet from "./pages/SubmitPet";
import AdminSubmissions from "./pages/AdminSubmissions";
import Adopt from "./pages/Adopt";
import AdminApplications from "./pages/AdminApplications";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPets from "./pages/AdminPets";
import AdminAddPet from "./pages/AdminAddPet";
import AdminEditPet from "./pages/AdminEditPet";
import AdminUsers from "./pages/AdminUsers";

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
                <Route path="/admin/applications" element={<AdminApplications />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/pets" element={<AdminPets />} />
                <Route path="/admin/pets/add" element={<AdminAddPet />} />
                <Route path="/admin/pets/edit/:id" element={<AdminEditPet />} />
                <Route path="/admin/users" element={<AdminUsers />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
