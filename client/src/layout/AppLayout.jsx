import React from "react";
import SideBar from "../components/SideBar.jsx";
import ConversationList from "../components/ConversationList.jsx";
import ChatFeed from "../components/ChatFeed.jsx";
import NoChatSelected from "../components/NoChatSelected.jsx";
import Grid from "@mui/material/Grid";
import io from "socket.io-client";
import useFetch from "../hooks/useFetch.jsx";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Outlet } from "react-router-dom";

const useStyles = () => ({
    root: {
        height: "100vh",
        padding: 2,
        gap: 2
    },
    side: {
        background: "primary.main",
    },
    chatList: {
        minWidth: 350,
    },
    chatFeed: {
        minWidth: 350,
        minHeight: 350,
    },
});

const ChatsView = () => {
    const [openSnackBar, setOpenSnackBar] = React.useState(false);

    const { response, isLoading } = useFetch("/api/chats");

    const classes = useStyles();
    /* const socket = React.useRef(null);

    React.useEffect(() => {
        if (response.ok) {
            setChatList(response.data.chats);
        }
    }, [response]);

    React.useEffect(() => {
        socket.current = io("http://localhost:3000/");

        socket.current.on("connect", () => {
            setConnected(true);
            setOpenSnackBar(true);
        });

        socket.current.on("disconnect", () => {
            setConnected(false);
            setOpenSnackBar(true);
        });

        return () => {
            socket.current.disconnect();
            socket.current = null;
        };
    }, []);

    React.useEffect(() => {
        if (!socket.current || !activeChat) return;

        socket.current.emit("chat:leave", () => {
            socket.current.emit("chat:join", activeChat.id);
        });
    }, [activeChat]); */

    const handleClose = () => {
        setOpenSnackBar(false);
    };

    return (
        <Grid container sx={classes.root}>
            <Grid item >
                <SideBar />
            </Grid>
            <Outlet/>
        </Grid>
    );
};

export default ChatsView;
