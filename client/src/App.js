import React from "react";
import Login from "./views/Login.jsx";
import Register from "./views/Register.jsx";
import NoMatch from "./views/NotFound.jsx";
import Dashboard from "./views/Dashboard.jsx";
import HomePage from "./views/Home.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { ThemeProvider } from "./context/ThemeProvider.jsx";
import { Routes, Route } from "react-router-dom";

const App = () => {
    return (
        <>
            <ThemeProvider>
                <CssBaseline />
                <AuthProvider>
                    <Routes>
                        <Route path="/" exact element={<HomePage />} />
                        <Route path="/login" exact element={<Login />} />
                        <Route path="/register" exact element={<Register />} />
                        <Route element={<RequireAuth />}>
                            <Route path="/app" element={<Dashboard />} />
                        </Route>
                        <Route path="*" element={<NoMatch />} />
                    </Routes>
                </AuthProvider>
            </ThemeProvider>
        </>
    );
};

export default App;
