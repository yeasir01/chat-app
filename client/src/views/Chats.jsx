import React from "react";
import SideBar from "../components/SideBar.jsx";
import ChatList from "../components/ChatList.jsx";
import ChatFeed from "../components/ChatFeed.jsx";
import NoChatSelected from "../components/NoChatSelected.jsx";
import Grid from "@mui/material/Grid";
import io from "socket.io-client";
import useFetch from "../hooks/useFetch.jsx";

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

const ChatsView = () => {
    const [chatList, setChatList] = React.useState([]);
    const [activeChat, setActiveChat] = React.useState(null);
    const [connected, setConnected] = React.useState(false);
    const [notification, setNotification] = React.useState({});

    const { response: chatsResponse, isLoading: chatsLoading } = useFetch("/api/chats");

    const socket = React.useRef(null);
    const classes = useStyles();

    React.useEffect(() => {
        if (chatsResponse.ok) {
            setChatList(chatsResponse.data.chats);
        }
    }, [chatsResponse]);

    // Socket event listeners
    React.useEffect(() => {
        socket.current = io("http://localhost:3000/");

        socket.current.on("connect", () => {
            setConnected(true);
        });

        socket.current.on("disconnect", () => {
            setConnected(false);
        });

        return () => {
            socket.current.disconnect();
            socket.current = null;
        };
    }, []);

    React.useEffect(() => {
        if (!socket.current || !activeChat) return;

        socket.current.emit("chat:active", activeChat.id);
    }, [activeChat]);

    React.useEffect(() => {
        if (connected) {
            console.log("websocket connected");
        }
    }, [connected]);

    return (
        <Grid container sx={classes.root}>
            <Grid item sx={classes.side}>
                <SideBar />
            </Grid>
            <Grid item sx={classes.list}>
                <ChatList
                    setActiveChat={setActiveChat}
                    activeChat={activeChat}
                    chatList={chatList}
                    isLoading={chatsLoading}
                />
            </Grid>
            <Grid item xs sx={classes.chatFeed}>
                {Boolean(activeChat) ? (
                    <ChatFeed activeChat={activeChat} socket={socket.current} />
                ) : (
                    <NoChatSelected />
                )}
            </Grid>
        </Grid>
    );
};

export default ChatsView;
