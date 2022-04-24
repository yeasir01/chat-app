import { createContext, useState } from "react";
import useFetch from "../hooks/useFetch.jsx";

const AuthContext = createContext({});

const initialState = {
    user: {
        email: "",
        handle: "",
        id: 1,
    },
    isAuthenticated: true,
};

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(initialState);
    const [response, error, isLoading, request] = useFetch();

    const logout = () => {
        request.delete("/api/auth/logout");
        setAuth(initialState);
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
