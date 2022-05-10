import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Divider from "@mui/material/Divider";
import SearchBar from "./SearchBar.jsx";
import Badge from '@mui/material/Badge';
import { truncate } from "../util/helpers.js";
import Fade from "@mui/material/Fade";
import useAuth from "../hooks/useAuth.jsx"
import LoaderBoundary from "./LoaderBoundary.jsx";

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

const ChatListContainer = (props) => {
    const auth = useAuth();
    const classes = useStyles();
    
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
                    <LoaderBoundary loading={props.isLoading}>
                        <List disablePadding>
                            {props.chatList.map((chat, idx) => {
                                const isMe = chat?.messages[0]?.user?.id === auth.user.id;
                                const isGroup = chat?.isGroup;
                                const groupName = chat?.title;
                                const avatar = isGroup ? chat?.avatar : chat?.users[0]?.avatar;
                                const lastMessage = chat?.messages[0]?.text;
                                const lastMessageUser = chat?.messages[0]?.user?.firstName;
                                const firstName = chat?.users[0]?.firstName;
                                const lastName = chat?.users[0]?.lastName;
                                const fullName = firstName + " " + lastName;
                                const displayName = isGroup ? groupName : fullName;
                                const lastMsgDisplay = `${isMe ? "Me" : lastMessageUser}: ${lastMessage}`;
                                const animationDelay = 300 * (idx + 1);
                                const isOnline = isGroup ? false : chat?.users[0]?.isOnline;
                                
                                return (
                                    <Fade in timeout={animationDelay} key={chat.id}>
                                        <ListItemButton
                                            divider
                                            selected={props.activeChat?.id === chat.id}
                                            onClick={() => {
                                                props.setActiveChat({
                                                    id: chat.id,
                                                    avatar: avatar,
                                                    title: displayName,
                                                    isGroup: isGroup
                                                })
                                            }}
                                        >
                                            <ListItemAvatar>
                                                <Badge color="success" overlap="circular" variant="dot" invisible={isOnline ? false : true}>
                                                    <Avatar src={avatar} />
                                                </Badge>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={displayName}
                                                primaryTypographyProps={classes.primaryText}
                                                secondary={truncate(lastMsgDisplay, 40)}
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

export default ChatListContainer;
