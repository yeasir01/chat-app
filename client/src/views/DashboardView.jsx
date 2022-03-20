import React from "react";
import useAuth from "../hooks/useAuth.jsx";

const DashboardView = function() {
    const { auth } = useAuth();
    
    return(
        <>
            <h1>Welcome {auth.user.firstName}</h1>
        </>
    );
};

export default DashboardView;