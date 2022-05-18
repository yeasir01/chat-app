import React from "react";
import { Snackbar, Alert } from "@mui/material";
import useStore from "../hooks/useStore.jsx";

const SnackBar = () => {
    const snackbar = useStore((state) => state.snackbar);
    const closeSnackbar = useStore(state=> state.closeSnackbar);

    const handleClose = () => {
        closeSnackbar()
    }
    
    return (
        <Snackbar
            open={snackbar.isOpen}
            autoHideDuration={snackbar.duration}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity={snackbar.severity}
                sx={{ borderRadius: 10, width: "100%" }}
            >
                {snackbar.message}
            </Alert>
        </Snackbar>
    );
};

export default SnackBar;
