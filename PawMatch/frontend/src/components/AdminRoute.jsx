import { Navigate } from "react-router";

function AdminRoute({ children }) {
    //得到token
    const token = localStorage.getItem("token");
    //token 了后就看role
    const role = localStorage.getItem("role");
//如果token 是空的就跳去login page
    if (!token) {
        return <Navigate to="/login" replace />;
    }
// !== 是检查是不是admin 或者 user 
    if (role !== "admin") {
        return <Navigate to="/home" replace />;
    }

    return children;
}

export default AdminRoute;
