import React from "react";
//import useAuth from "../hooks/useAuth.jsx";
import SideBar from "../components/SideBar.jsx";
import ChatList from "../components/ChatList.jsx";
import ChatFeed from "../components/ChatFeed.jsx";
//import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const useStyles = ()=>({
    root: {
        gap: 0
    },
    side: {
        width: "100px"
    },
    list: {
        width: "350px"
    }
})

const DashboardView = function() {

    const classes = useStyles();

    return(
        <Grid container sx={classes.root}>
            <Grid item sx={classes.side}>
                <SideBar />
            </Grid>
            <Grid item sx={classes.list}>
                <ChatList />
            </Grid>
            <Grid item xs>
                <ChatFeed />
            </Grid>
        </Grid>
    );
};

export default DashboardView;