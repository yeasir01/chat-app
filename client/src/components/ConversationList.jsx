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
import { useStore, types } from "../hooks/useStore.jsx";
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
    const dispatch = useStore((state) => state.dispatch);
    const chats = useStore((state) => state.chats);
    //const messages = useStore((state) => state.messages);
    const activeChatId = useStore((state) => state.activeChatId);

    const { response, isLoading } = useFetch("/api/chats");

    const classes = useStyles();
    
    useEffect(()=>{
        if (response.ok) {
            dispatch({type: types.SET_CHATS, payload: response.data.chats})
        }
    },[response, dispatch])

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
                                const isMe = chat?.messages[0]?.user?.id === user.id;
                                const isGroup = chat.isGroup;
                                const groupName = chat.title;
                                const avatar = isGroup ? chat?.avatar : chat?.users[0]?.avatar;
                                const lastMessage = chat?.messages[0]?.text;
                                const lastMessageUser = chat?.messages[0]?.user?.firstName;
                                const firstName = chat?.users[0]?.firstName;
                                const lastName = chat?.users[0]?.lastName;
                                const fullName = firstName + " " + lastName;
                                const displayName = isGroup ? groupName : fullName;
                                const lastMsgDisplay = `${isMe ? "me" : lastMessageUser}: ${lastMessage}`;
                                const animationDelay = (idx + 1) * 300;
                                
                                return (
                                    <Fade in timeout={animationDelay} key={idx}>
                                        <ListItemButton
                                            divider
                                            selected={activeChatId === chat.id}
                                            onClick={() => dispatch({
                                                type: types.SET_ACTIVE_CHAT, 
                                                payload: chat.id
                                            })}
                                        >
                                            <ListItemAvatar> 
                                                <CustomAvatar src={avatar} >
                                                    {chat.isGroup ? chat.title : `${chat.users[0].firstName} ${chat.users[0].lastName}`}
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
