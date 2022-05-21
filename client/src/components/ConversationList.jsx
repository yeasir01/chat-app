import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Divider from "@mui/material/Divider";
import SearchBar from "./SearchBar.jsx";
import { truncate } from "../util/helpers.js";
import Fade from "@mui/material/Fade";
import LoaderBoundary from "./LoaderBoundary.jsx";
import useStore from "../hooks/useStore.jsx";
import useFetch from "../hooks/useFetch.jsx";
import CustomAvatar from "../components/CustomAvatar.jsx";

const useStyles = () => ({
    root: {
        borderRadius: 2,
        overflow: "hidden",
        height: 1,
    },
    search: {
        padding: 2,
    },
    primaryText: {
        color: "text.primary",
    },
    secondaryText: {
        color: "text.secondary",
    },
});

const ConversationList = () => {
    const user = useStore((state) => state.user);
    const setChats = useStore((state) => state.setChats);
    const chats = useStore((state) => state.chats);
    const activeChat = useStore((state) => state.activeChat);
    const setActiveChat = useStore((state) => state.setActiveChat);

    const { response, isLoading } = useFetch("/api/chats");

    const classes = useStyles();
    
    useEffect(() => {
        if (response.ok && response.data.chats) {
            setChats(response.data.chats)
        }
    },[response, setChats])

    return (
        <Paper elevation={1} sx={classes.root}>
            <Grid container direction="column" height={1}>
                <Grid item sx={classes.search}>
                    <SearchBar placeHolder="find conversations" />
                </Grid>
                <Grid item>
                    <Divider />
                </Grid>
                <Grid item xs sx={{ overflowY: "auto" }}>
                    <LoaderBoundary loading={isLoading}>
                        <List disablePadding>
                            {chats.map((chat, idx) => {
                                const lastMessageObject = chat.messages.at(-1);
                                const isMe = lastMessageObject?.user.id === user.id;
                                const avatar = chat.isGroup ? chat.avatar : chat.members[0]?.avatar;
                                const lastMessage = lastMessageObject?.text;
                                const firstName = chat.members[0]?.firstName;
                                const lastName = chat.members[0]?.lastName;
                                const displayName = chat.isGroup ? chat.title : `${firstName} ${lastName}`;
                                const lastMsgDisplay = `${isMe ? "me" : firstName}: ${lastMessage}`;
                                const animateInDelay = (idx + 1) * 300;
                                
                                return (
                                    <Fade in timeout={animateInDelay} key={idx}>
                                        <ListItemButton
                                            divider
                                            selected={activeChat === chat.id}
                                            onClick={()=>setActiveChat(chat.id)}
                                        >
                                            <ListItemAvatar> 
                                                <CustomAvatar src={avatar} >
                                                    {chat.isGroup ? chat.title : `${firstName} ${lastName}`}
                                                </CustomAvatar>
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

export default ConversationList;
