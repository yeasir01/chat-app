import { Navigate, Outlet } from "react-router-dom";
import useStore from "../../hooks/useStore.jsx";

const RequireNoAuth = () => {
    const isAuthenticated = useStore(state => state.isAuthenticated);
    
    return (
        isAuthenticated ? <Navigate to="/" replace={true} /> : <Outlet />
    );
};

export default RequireNoAuth;
