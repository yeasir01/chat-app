import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';

const useStyles = () => ({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: 1,
        width: 1
    },
    icon: {
        height: "100px",
        width: "100px",
        color: "divider"
    },
    text: {
        color: "text.disabled",
        fontWeight: "normal"
    }
});

const NoChatSelected = () => {

    const classes = useStyles();

    return (
        <Paper elevation={1} sx={{height: 1}}>
            <Grid container sx={classes.container}>
                <Grid item>
                    <ChatOutlinedIcon sx={classes.icon}/>
                </Grid>
                <Grid>
                    <Typography variant="h6" sx={classes.text}>No conversation selected</Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default NoChatSelected;
