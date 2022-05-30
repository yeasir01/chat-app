import React from "react";
import Login from "./views/Login.jsx";
import Register from "./views/Register.jsx";
import NoMatch from "./views/NotFound.jsx";
import HomePage from "./views/Home.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";
import PeopleList from "./components/PeopleList.jsx";
import ProfileList from "./components/ProfileList.jsx";
import RequireAuth from "./components/utility/RequireAuth.jsx";
import RequireNoAuth from "./components/utility/RequireNoAuth.jsx";
import ChatLayout from "./layout/ChatLayout.jsx";
import Dashboard from "./views/Dashboard.jsx";
import useTheme from "./hooks/useTheme.jsx"
import theme from "./themes/index.js";

const App = () => {
    const mode = useTheme(state=> state.mode);

    return (
        <>
            <ThemeProvider theme={theme[mode]}>
                    <CssBaseline />
                    <Routes>
                        <Route path="/" exact element={<HomePage />} />
                        <Route element={<RequireNoAuth />}>
                            <Route path="/login" exact element={<Login />} />
                            <Route path="/register" exact element={<Register />} />
                        </Route>
                        <Route element={<RequireAuth />}>
                            <Route element={<Dashboard />}>
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
