import React from "react";
import Avatar from "@mui/material/Avatar";

const useStyle = (size)=> ({
    root: {
        border: "2px solid primary.main",
        width: size || 40,
        height: size || 40
    }
});

const getInitials = (text) => {
    try {
        if (text === "me") { return text };
        const firstLetter = text.split(" ")[0][0] || "";
        const secondLetter = text.split(" ")[1][0] || "";

        return firstLetter.concat(secondLetter).toUpperCase();
    } catch (error) {
        console.log(error)
    }
}

const CommonAvatar = ({children, size , sx, text, ...rest}) => {
    
    const classes = useStyle(size);
    const initials = getInitials(text)

    return (
        <>
            <Avatar sx={{...classes.root, ...sx}} {...rest}>
                {initials}
            </Avatar>
        </>
    );
};

export default CommonAvatar;
