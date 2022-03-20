import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import ErrorView from "./views/ErrorView.jsx";
import Dashboard from "./views/DashboardView.jsx";
import HomePage from "./views/HomePage.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme();

const App = () => {
    return (
        <>
            <AuthProvider>
                <ThemeProvider theme={theme}>
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
