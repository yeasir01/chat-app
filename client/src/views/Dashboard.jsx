import React from "react";
import SideBar from "../components/SideBar.jsx";
import ChatList from "../components/ChatList.jsx";
import ChatFeed from "../components/ChatFeed.jsx";
import NoChatSelected from "../components/NoChatSelected.jsx";
import Grid from '@mui/material/Grid';

const useStyles = ()=>({
    root: {
        gap: 2,
        height: "100vh",
        padding: 2
    },
    side: {
        background: "primary.main"
    },
    list: {
        minWidth: 350
    },
    chatFeed: {
        minWidth: 350,
        minHeight: 350
    }
})

const DashboardView = () => {
    const [activeChat, setActiveChat] = React.useState(null);

    const classes = useStyles();
    const isActive = Boolean(activeChat);

    return (
        <Grid container sx={classes.root}>
            <Grid item sx={classes.side}>
                <SideBar />
            </Grid>
            <Grid item sx={classes.list}>
                <ChatList 
                    setActiveChat={setActiveChat} 
                    activeChat={activeChat} 
                />
            </Grid>
            <Grid item xs sx={classes.chatFeed}>
                {isActive ? <ChatFeed activeChat={activeChat} /> : <NoChatSelected />}
            </Grid>
        </Grid>
    );
};

export default DashboardView;