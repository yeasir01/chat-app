import React from "react";
import SideBar from "../components/SideBar.jsx";
import ChatList from "../components/ChatList.jsx";
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
        gap: 2,
        height: "100vh",
        padding: 2,
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
    const [chatList, setChatList] = React.useState([]);
    const [activeChat, setActiveChat] = React.useState(null);
    //const [notification, setNotification] = React.useState({});
    const [connected, setConnected] = React.useState(false);
    const [openSnackBar, setOpenSnackBar] = React.useState(false);

    const { response, isLoading } = useFetch("/api/chats");

    const socket = React.useRef(null);
    const classes = useStyles();

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
    }, [activeChat]);

    const handleClose = () => {
        setOpenSnackBar(false);
    };

    return (
        <Grid container sx={classes.root}>
            <Grid item sx={classes.side}>
                <SideBar />
            </Grid>
            <Grid item sx={classes.chatList}>
                {/* <ChatList
                    setActiveChat={setActiveChat}
                    activeChat={activeChat}
                    chatList={chatList}
                    isLoading={isLoading}
                /> */}

                <Outlet/>
            </Grid>
            <Grid item xs sx={classes.chatFeed}>
                {Boolean(activeChat) ? (
                    <ChatFeed activeChat={activeChat} socket={socket.current} />
                ) : (
                    <NoChatSelected />
                )}

                <Snackbar
                    open={openSnackBar}
                    autoHideDuration={connected ? 3000 : null}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    onClose={handleClose}
                >
                    <Alert
                        onClose={handleClose}
                        severity={connected ? "success" : "error"}
                        sx={{ borderRadius: 10, width: "100%" }}
                    >
                        {connected
                            ? "Ready to chatter!"
                            : "Lost connection attempting to reconnecting..."}
                    </Alert>
                </Snackbar>
            </Grid>
        </Grid>
    );
};

export default ChatsView;
