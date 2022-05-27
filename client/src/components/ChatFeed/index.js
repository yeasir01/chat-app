import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import useStore from "../../hooks/useStore.jsx";
import useFetch from "../../hooks/useFetch.jsx";
import SearchBar from "../common/SearchBar.jsx";
import LoaderBoundary from "../utility/LoaderBoundary.jsx";
import Avatar from "../common/CommonAvatar.jsx";
import Header from "./Header.jsx";

const useStyles = () => ({
    root: {
        borderRadius: 2,
        overflow: "hidden",
        height: 1,
        boxShadow: "none"
    },
    avatar: {
        width: 45,
        height: 45
    },
    conversationHeader: {
        padding: 2,
        paddingBottom: 0
    },
    search: {
        padding: 2
    },
    primaryText: {
        color: "text.primary",
    },
    secondaryText: {
        color: "text.secondary",
    },
});

const truncate = (sentence = "", maxLen = 50) => {
    if (sentence.length < maxLen) {
        return sentence;
    }
    return sentence.substring(0, maxLen) + "..."
}

const Main = () => {
    const user = useStore((state) => state.user);
    const setChats = useStore((state) => state.setChats);
    const chats = useStore((state) => state.chats);
    const activeChat = useStore((state) => state.activeChat);
    const setActiveChat = useStore((state) => state.setActiveChat);

    const { response, isLoading } = useFetch("/api/chats");

    const classes = useStyles();
    
    useEffect(() => {
        if (response.data?.chats) {
            setChats(response.data.chats)
        }
    },[response, setChats])

    return (
        <Paper elevation={1} sx={classes.root}>
            <Grid container direction="column" height={1}>
                <Grid item sx={classes.conversationHeader}>
                    <Header />
                </Grid>
                <Grid item sx={classes.search}>
                    <SearchBar placeHolder="find conversations" />
                </Grid>
                <Grid item>
                    <Divider />
                </Grid>
                <Grid item xs sx={{ overflowY: "auto" }}>
                    <LoaderBoundary loading={isLoading} message="Loading chats...">
                        <List disablePadding>
                            {chats.map((chat, idx) => {
                                const lastMessage = chat.messages.at(-1);
                                const isMe = lastMessage.user.id === user.id;
                                const avatar = chat.isGroup ? chat.avatar : chat.members[0]?.avatar;
                                const displayName = chat.isGroup ? chat.title : `${chat.members[0].firstName} ${chat.members[0]?.lastName}`;
                                const lastMsgDisplay = `${isMe ? "me" : lastMessage.user.firstName}: ${lastMessage.text}`;
                                const animateInDelay = (idx + 1) * 300;
                                
                                return (
                                    <Fade in timeout={animateInDelay} key={chat.id}>
                                        <ListItemButton
                                            divider
                                            selected={activeChat === chat.id}
                                            onClick={()=>setActiveChat(chat.id)}
                                        >
                                            <ListItemAvatar> 
                                                <Avatar src={avatar} sx={classes.avatar} text={displayName} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={displayName}
                                                secondary={truncate(lastMsgDisplay, 35)}
                                                primaryTypographyProps={classes.primaryText}
                                                secondaryTypographyProps={classes.secondaryText}
                                            />
                                        </ListItemButton>
                                    </Fade>
                                );
                            })}
                        </List>
                    </LoaderBoundary>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Main;
