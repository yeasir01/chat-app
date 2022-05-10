import { createContext, useEffect, useReducer } from "react";
import { INITIAL_AUTH_STATE, authReducer, authTypes } from "../reducers/auth-reducer.js";
import useFetch from "../hooks/useFetch.jsx";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, INITIAL_AUTH_STATE);
    const { response, error, isLoading, request } = useFetch();
    
    useEffect(() => {
        if (response.data.user) {
            dispatch({type: authTypes.SET_USER, payload: response.data.user});
        }
    }, [response]);

    useEffect(()=>{
        console.log(state)
    },[state])

    const logout = () => {
        request("/api/auth/logout", {
            method: "DELETE",
            credentials: "include",
        });
        dispatch({type: authTypes.RESET});
    };

    const login = (payload) => {
        request("api/auth/login", {
            method: "POST",
            body: {
                email: payload.email,
                password: payload.password,
                remember: payload.remember
            }
        },{ user: null })
    }
    
    return (
        <AuthContext.Provider value={{ user: state.user, isAuthenticated: state.isAuthenticated, error, isLoading, login, logout  }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
