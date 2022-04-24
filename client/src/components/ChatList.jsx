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
import useFetch from "../hooks/useFetch.jsx";
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

const ChatListContainer = ({ setConversation, activeConversation }) => {
    const [response, error, isLoading] = useFetch("/api/chats");
    const [chatList, setChatList] = React.useState([]);
    const { auth } = useAuth();

    React.useEffect(() => {
        if (response?.ok) {
            setChatList(response.data.chats);
        }
    }, [response]);

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
                    <LoaderBoundary loading={isLoading}>
                        <List disablePadding>
                            {chatList.map((item, idx) => {
                                const isMe = item.messages[0].user.id === auth.user.id;
                                const isGroup = item.isGroup;
                                const groupName = item.title || "";
                                const avatar = isGroup ? item.avatar : item.users[0].avatar;
                                const lastMessage = item.messages[0].body || "";
                                const lastMessageUser = item.messages[0].user.firstName || "";
                                const firstName = item.users[0].firstName || "";
                                const lastName = item.users[0].lastName || "";
                                const personsName = firstName + " " + lastName;
                                const displayName = isGroup ? groupName : personsName;
                                const messageDisplay = (isMe ? "Me" : lastMessageUser) + ": " + lastMessage;
                                const animationDelay = 300 * (idx + 1);
                                const isOnline = isGroup ? false : item.users[0].isOnline;
                                
                                return (
                                    <Fade in timeout={animationDelay} key={item.id}>
                                        <ListItemButton
                                            divider
                                            selected={activeConversation === item.id}
                                            onClick={() => {
                                                setConversation({
                                                    id: item.id,
                                                    avatar,
                                                    displayName
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
                                                secondary={truncate(messageDisplay, 40)}
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
