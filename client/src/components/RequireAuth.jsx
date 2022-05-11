import { useLocation, Navigate, Outlet } from "react-router-dom";
import useStore from "../hooks/useStore.jsx";

const RequireAuth = () => {
    const location = useLocation();
    const isAuthenticated = useStore(state=> state.isAuthenticated);
    /* const requestedPath = location.state?.from?.pathname || "/"; */
    
    return (
        isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{from: location}} replace />
    );
};

export default RequireAuth;
