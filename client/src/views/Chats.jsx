import React from "react";
import SideBar from "../components/SideBar.jsx";
import ChatList from "../components/ChatList.jsx";
import ChatFeed from "../components/ChatFeed.jsx";
import NoChatSelected from "../components/NoChatSelected.jsx";
import Grid from "@mui/material/Grid";
import io from "socket.io-client";
import useFetch from "../hooks/useFetch.jsx";
import useAuth from "../hooks/useAuth.jsx";

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
    const [messages, setMessages] = React.useState([]);
    const [connected, setConnected] = React.useState(false);
    const [notification, setNotification] = React.useState({});

    const { response: chatsResponse, isLoading: chatsLoading } = useFetch("/api/chats");
    const { response: messageResponse, isLoading: messagesLoading, request: messageRequest} = useFetch();

    const { auth } = useAuth();

    const socket = React.useRef(null);
    const classes = useStyles();

    React.useEffect(() => {
        if (chatsResponse.ok) {
            setChatList(chatsResponse.data.chats);
        }
    }, [chatsResponse]);

    React.useEffect(() => {
        if (messageResponse.ok) {
            setMessages(messageResponse.data);
        }
    }, [messageResponse]);

    // Socket event listeners
    React.useEffect(() => {
        socket.current = io("http://localhost:3000/");

        socket.current.on("connect", () => {
            setConnected(true);
        });

        socket.current.on("disconnect", () => {
            setConnected(false);
        });

        socket.current.on("message:receive", (newMsg) => {
            setMessages((prevMsgs) => [...prevMsgs, newMsg]);
        });

        return () => {
            socket.current.disconnect();
            socket.current = null;
        };
    }, []);
    
    React.useEffect(() => {
        if (!socket.current || !activeChat) return;
        
        socket.current.emit("chat:join", activeChat.id);

    }, [activeChat]);

    React.useEffect(() => {
        if(activeChat?.id){
            messageRequest(`/api/messages?chatId=${activeChat.id}`);
        }
    }, [activeChat, messageRequest]);

    React.useEffect(()=>{
        if(connected){
            console.log("websocket connected");
        }
    },[connected])

    const sendMessage = (msg) => {
        const now = new Date().toISOString();

        const newMsg = {
            chatId: activeChat.id,
            body: msg,
            createdAt: now,
            user: auth.user,
        }

        setMessages((prevMsgs) => [...prevMsgs, newMsg])
        socket.current.emit("message:create", newMsg)
    }

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
                    <ChatFeed
                        activeChat={activeChat}
                        messages={messages}
                        isLoading={messagesLoading}
                        socket={socket}
                        sendMessage={sendMessage}
                    />
                ) : (
                    <NoChatSelected />
                )}
            </Grid>
        </Grid>
    );
};

export default ChatsView;
