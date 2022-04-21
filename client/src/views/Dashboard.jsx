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
    const [conversation, setConversations] = React.useState([]);
    const [filteredConversations, setFilteredConversations] = React.useState([]);
    const [activeConversation, setActiveConversation] = React.useState(null);
    const [messages, setMessages] = React.useState([]);

    const classes = useStyles();
    const isActive = Boolean(activeConversation);

    return (
        <Grid container sx={classes.root}>
            <Grid item sx={classes.side}>
                <SideBar />
            </Grid>
            <Grid item sx={classes.list}>
                <ChatList setConversation={setActiveConversation} />
            </Grid>
            <Grid item xs sx={classes.chatFeed}>
                {isActive ? <ChatFeed groupDetails={activeConversation} /> : <NoChatSelected />}
            </Grid>
        </Grid>
    );
};

export default DashboardView;