import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useStore, types } from "../hooks/useStore.jsx";

const SnackBar = () => {
    const isOpen = useStore((state) => state.snackbar.isOpen);
    const duration = useStore((state) => state.snackbar.duration);
    const severity = useStore((state) => state.snackbar.severity);
    const message = useStore((state) => state.snackbar.message);
    const dispatch = useStore((state) => state.dispatch);

    const handleClose = () => {
        dispatch({ type: types.CLOSE_SNACKBAR })
    }
    
    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={duration}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity={severity}
                sx={{ borderRadius: 10, width: "100%" }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default SnackBar;
