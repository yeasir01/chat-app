import { createContext, useState, useEffect } from "react";
import useFetch from "../hooks/useFetch.jsx";

const AuthContext = createContext({});

const initAuthState = {
    user: {
        email: "",
        handle: "",
        id: null,
    },
    isAuthenticated: false,
};

export const AuthProvider = (props) => {
    const [auth, setAuth] = useState(initAuthState);
    const { response, request } = useFetch("/api/auth/authenticate", { credentials: "include" });

    useEffect(() => {
        if (response?.data?.user) {
            setAuth({ user: response.data.user, isAuthenticated: true });
        }
    }, [response]);

    const logout = () => {
        request("/api/auth/logout", {
            method: "DELETE",
            credentials: "include",
        });
        setAuth(initAuthState);
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, logout }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
