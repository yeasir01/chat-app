import { createContext, useState } from "react";
import { useFetch } from "../hooks/useFetch.jsx";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ user: null, isAuthenticated: true });
    const { request } = useFetch();

    const logout = () => {
        request.delete("/api/auth/logout");
        setAuth({
            isAuthenticated: false,
            user: null
        })
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
