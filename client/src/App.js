import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginView from "./views/LoginView.jsx";
import ErrorView from "./views/ErrorView.jsx";
import Dashboard from "./views/DashboardView.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";

const App = () => {
    return (
        <>
            <AuthProvider>
                <Routes>
                    <Route path="/" exact element={<LoginView />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="*" element={<ErrorView />} />
                </Routes>
            </AuthProvider>
        </>
    );
};

export default App;
