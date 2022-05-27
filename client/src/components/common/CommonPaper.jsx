import React from "react";
import Paper from "@mui/material/Paper";

const useStyle = ()=>({
    root: {
        boxShadow: "none"
    }
});

const CardComponent = ({sx, children, ...rest}) => {
    const classes = useStyle();

    return (
        <>
            <Paper sx={{...classes.root, ...sx}} {...rest}>
                {children}
            </Paper>
        </>
    );
};

export default CardComponent;
