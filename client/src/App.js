import React from "react";
import Login from "./views/Login.jsx";
import Register from "./views/Register.jsx";
import NoMatch from "./views/NotFound.jsx";
import AppLayout from "./layout/AppLayout.jsx";
import HomePage from "./views/Home.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "./context/ThemeProvider.jsx";
import { Routes, Route } from "react-router-dom";
import PeopleList from "./components/PeopleList.jsx";
import ProfileList from "./components/ProfileList.jsx";
import RequireNoAuth from "./components/RequireNoAuth.jsx";
import ChatLayout from "./layout/ChatLayout.jsx";

const App = () => {
    return (
        <>
            <ThemeProvider>
                    <CssBaseline />
                
                    <Routes>
                        <Route path="/" exact element={<HomePage />} />
                        <Route element={<RequireNoAuth />}>
                            <Route path="/login" exact element={<Login />} />
                            <Route path="/register" exact element={<Register />} />
                        </Route>
                        <Route element={<RequireAuth />}>
                            <Route element={<AppLayout />}>
                                <Route path="/chats" element={<ChatLayout />} />
                                <Route path="/people" element={<PeopleList />} />
                                <Route path="/profile" element={<ProfileList />} />
                            </Route>
                        </Route>
                        <Route path="*" element={<NoMatch />} />
                    </Routes>
                
            </ThemeProvider>
        </>
    );
};

export default App;
