import React from "react";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import ErrorView from "./views/ErrorView.jsx";
import Dashboard from "./views/DashboardView.jsx";
import HomePage from "./views/HomePage.jsx";
import RequireAuth from "./util/RequireAuth.jsx";
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from "./context/AuthProvider.jsx";
import { ThemeProvider } from "./context/ThemeProvider.jsx";
import { Routes, Route } from "react-router-dom";

const App = () => {
    return (
        <>
            <AuthProvider>
                <ThemeProvider>
                    <CssBaseline />
                    <Routes>
                        <Route path="/" exact element={<HomePage />} />
                        <Route path="/login" exact element={<Login />} />
                        <Route path="/register" exact element={<Register />} />
                        <Route element={<RequireAuth />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                        </Route>
                        <Route path="*" element={<ErrorView />} />
                    </Routes>
                </ThemeProvider>
            </AuthProvider>
        </>
    );
};

export default App;
