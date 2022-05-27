import { useLocation, Navigate, Outlet } from "react-router-dom";
import useStore from "../../hooks/useStore.jsx";

const RequireAuth = () => {
    const isAuthenticated = useStore(state=> state.isAuthenticated);
    const location = useLocation();

    return (
        isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{from: location}} replace />
    );
};

export default RequireAuth;
