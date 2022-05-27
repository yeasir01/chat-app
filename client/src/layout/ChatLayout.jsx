import React from "react";
import ChatFeed from "../components/ChatFeed";
import NoChatSelected from "../components/utility/NoChatSelected.jsx";
import useStore from "../hooks/useStore.jsx";
import Grid from "@mui/material/Grid";
import MessageFeed from "../components/MessageFeed";

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

const ChatLayout = () => {

    const activeChat = useStore(state=> state.activeChat);
    const classes = useStyles();

    return (
        <>
            <Grid item sx={classes.chatList}>
                <ChatFeed/>
            </Grid>
            <Grid item xs sx={classes.chatFeed}>
               {!!activeChat ? <MessageFeed/>: <NoChatSelected/>}
            </Grid>
        </>
    );
};

export default ChatLayout;
