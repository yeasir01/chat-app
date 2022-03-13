import React from "react";
import TextInput from "../components/lib/TextInput.jsx";

const DashboardView = function() {
    
    return(
        <>
            <TextInput id="0" label="Name" error="Name cannot be blank"/>
            <TextInput id="1" label="Name" />
            <TextInput id="2" label="Name" error="Name cannot be blank"/>
        </>
    );
};

export default DashboardView;