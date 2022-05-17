import React from "react";
import ConversationList from "../components/ConversationList.jsx";
import ChatFeed from "../components/ChatFeed.jsx";
import NoChatSelected from "../components/NoChatSelected.jsx";
import useStore from "../hooks/useStore.jsx";
import Grid from "@mui/material/Grid";

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

    const activeChatId = useStore(state=> state.activeChatId);
    const classes = useStyles();

    return (
        <>
            <Grid item sx={classes.chatList}>
                <ConversationList/>
            </Grid>
            <Grid item xs sx={classes.chatFeed}>
               {!!activeChatId ? <ChatFeed/>: <NoChatSelected/>}
            </Grid>
        </>
    );
};

export default ChatLayout;
