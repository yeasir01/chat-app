import React from "react";
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

const useStyles = () => ({
    root: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        width: "100vw"
    },
    icon: {
        height: "200px",
        width: "200px",
        color: "divider"
    },
    text: {
        color: "text.disabled",
        fontWeight: "normal",
        textAlign: "center"
    }
});

const ErrorView = () => {
    const classes = useStyles();
    
    return(
            <Grid container sx={classes.root}>
                <Grid item>
                    <SentimentDissatisfiedIcon sx={classes.icon}/>
                </Grid>
                <Grid>
                    <Typography variant="h3" sx={classes.text}>404</Typography>
                    <Typography variant="h5" sx={classes.text}>Sorry we could'nt find that page...</Typography>
                </Grid>
                <Grid p={3}>
                    <Button 
                        component={Link} to="/"
                        variant="text" 
                        color="error"
                        >
                        Back to safety
                    </Button>
                </Grid>
            </Grid>
    );
};

export default ErrorView;