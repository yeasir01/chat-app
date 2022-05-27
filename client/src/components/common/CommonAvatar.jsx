import React from "react";
import Avatar from "@mui/material/Avatar";

const useStyle = (size)=> ({
    root: {
        border: "2px solid primary.main",
        width: size || 40,
        height: size || 40
    }
});

const CommonAvatar = ({children, size , sx, text, ...rest}) => {
    
    const classes = useStyle(size);

    const getInitials = (input) => {
        if (!input) { return "" };
        if (input === "me") {return "me"}
        const fullName = input.split(" ");
        const initials = fullName[0][0] + fullName[1][0];
        return initials.toUpperCase();
    };

    return (
        <>
            <Avatar sx={{...classes.root, ...sx}} {...rest}>
                {getInitials(text)}
            </Avatar>
        </>
    );
};

export default CommonAvatar;
