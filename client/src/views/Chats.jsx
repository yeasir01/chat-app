import React from "react";
import SideBar from "../components/SideBar.jsx";
import ChatList from "../components/ChatList.jsx";
import ChatFeed from "../components/ChatFeed.jsx";
import NoChatSelected from "../components/NoChatSelected.jsx";
import Grid from "@mui/material/Grid";
import { io } from "socket.io-client";

const useStyles = () => ({
    root: {
        gap: 2,
        height: "100vh",
        padding: 2,
    },
    side: {
        background: "primary.main",
    },
    list: {
        minWidth: 350,
    },
    chatFeed: {
        minWidth: 350,
        minHeight: 350,
    },
});

const DashboardView = () => {
    const [activeChat, setActiveChat] = React.useState(null);
    const [socket, setSocket] = React.useState(null);

    const classes = useStyles();

    React.useEffect(() => {
        let origin = window.location.origin;
        let socket = io(origin);
        setSocket(socket);

        return () => {
            console.log("socket closed by react")
            socket.disconnect()
        };
    }, []);

    React.useEffect(() => {
        socket?.on("connect", () => {
            console.log("now connected");
        });

        socket?.on("new-user", (message) => {
            console.log(message);
        })
    }, [socket]);

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
                {Boolean(activeChat) ? (
                    <ChatFeed socket={socket} activeChat={activeChat} />
                ) : (
                    <NoChatSelected />
                )}
            </Grid>
        </Grid>
    );
};

export default DashboardView;
