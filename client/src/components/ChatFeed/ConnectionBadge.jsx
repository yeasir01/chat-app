import React from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import useStore from "../../hooks/useStore.jsx";

const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        color: "#44b700",
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        "&::after": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            animation: "ripple 1.2s infinite ease-in-out",
            border: "1px solid currentColor",
            content: '""',
        },
    },
    "@keyframes ripple": {
        "0%": {
            transform: "scale(.8)",
            opacity: 1,
        },
        "100%": {
            transform: "scale(2.4)",
            opacity: 0,
        },
    },
}));

const ConnectionBadge = ({ children }) => {
    const isConnected = useStore(state=> state.isConnected);

    return (
        <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
            color={isConnected ? "success" : "error"}
        >
            {children}
        </StyledBadge>
    );
};

export default ConnectionBadge;
