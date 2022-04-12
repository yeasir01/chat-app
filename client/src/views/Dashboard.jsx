import React from "react";
import SideBar from "../components/SideBar.jsx";
import ChatList from "../components/ChatList.jsx";
import ChatFeed from "../components/ChatFeed.jsx";
import NoChatSelected from "../components/NoChatSelected.jsx";
import Grid from '@mui/material/Grid';
import { Routes, Route } from "react-router-dom";
import io from 'socket.io-client'; 

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
        width: "350px"
    },
    chatFeed: {
        minWidth: "450px",
        minHeight: "450px"
    }
})

const DashboardView = () => {

/*     const origin = window.location.origin;
    const socket = io(origin);

    React.useEffect(() => {
        socket.on("connect", () => {
            console.log("now connected");
        });

        return () => socket.off("connect");
    }, [socket]);

    React.useEffect(() => {
        socket.on("new-user", (msg) => {
            console.log(msg);
        });

        return () => socket.off("new-user");
    }, [socket]); */

    const classes = useStyles();

    return (
        <Grid container sx={classes.root}>
            <Grid item sx={classes.side}>
                <SideBar />
            </Grid>
            <Grid item sx={classes.list}>
                <ChatList />
            </Grid>
            <Grid item xs sx={classes.chatFeed}>
                <Routes>
                    <Route path="/*" element={<NoChatSelected />} />
                    <Route path="/chats" element={<ChatFeed />} />
                </Routes>
            </Grid>
        </Grid>
    );
};

export default DashboardView;