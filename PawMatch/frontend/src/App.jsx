import { BrowserRouter, Routes, Route } from "react-router";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Pet from "./pages/Pet";
import Home from "./pages/Home";
import SubmitPet from "./pages/SubmitPet";
import PetDetails from "./pages/PetDetails";
import MyApplications from "./pages/MyApplications";

import AdminSubmissions from "./pages/AdminSubmissions";
import Adopt from "./pages/Adopt";
import AdminApplications from "./pages/AdminApplications";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPets from "./pages/AdminPets";
import AdminAddPet from "./pages/AdminAddPet";
import AdminEditPet from "./pages/AdminEditPet";
import AdminUsers from "./pages/AdminUsers";

import AdminRoute from "./components/AdminRoute";

// import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public */}
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* User */}
                <Route path="/home" element={<Home />} />
                <Route path="/pet" element={<Pet />} />
                <Route path="/pet" element={<Pet />} />
                <Route path="/pet/:id" element={<PetDetails />} />
                <Route path="/submit-pet" element={<SubmitPet />} />
                <Route path="/adopt/:petId" element={<Adopt />} />
                <Route path="/my-applications" element={<MyApplications />} />

                {/* Admin */}
                <Route
                    path="/admin/dashboard"
                    element={
                        <AdminRoute>
                            <AdminDashboard />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/submissions"
                    element={
                        <AdminRoute>
                            <AdminSubmissions />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/applications"
                    element={
                        <AdminRoute>
                            <AdminApplications />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/pets"
                    element={
                        <AdminRoute>
                            <AdminPets />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/pets/add"
                    element={
                        <AdminRoute>
                            <AdminAddPet />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/edit-pet/:id"
                    element={
                        <AdminRoute>
                            <AdminEditPet />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/users"
                    element={
                        <AdminRoute>
                            <AdminUsers />
                        </AdminRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
