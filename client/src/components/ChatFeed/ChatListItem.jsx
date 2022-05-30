import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import CommonAvatar from "../common/CommonAvatar.jsx";
import useStore from "../../hooks/useStore.jsx";
import Fade from "@mui/material/Fade";
import CircleIcon from '@mui/icons-material/Circle';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { format , parseISO } from "date-fns";

const useStyles = () => ({
    message: {
        color: "text.secondary",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: 230
    },
    time: {
        color: "text.secondary",
    },
    icon: {
        fontSize: ".85rem",
        height: 1,
        display: "flex",
        alignItems: "center"
    }
});

const ChatListItem = ({chat, delay}) => {
    const user = useStore((state) => state.user);
    const activeChat = useStore((state) => state.activeChat);
    const setActiveChat = useStore((state) => state.setActiveChat);

    const classes = useStyles();

    const lastMessage = chat.messages[0];
    const isMe = lastMessage.user.id === user.id;
    const avatar = chat.isGroup ? chat.avatar : chat.members[0]?.avatar;
    const displayName = chat.isGroup ? chat.title : `${chat.members[0].firstName} ${chat.members[0]?.lastName}`;
    const lastMsgDisplay = `${isMe ? "me" : lastMessage.user.firstName}: ${lastMessage.text}`;
    const lastMsgTime = format(parseISO(chat.messages[0].createdAt), "MM/dd/yy")

    return (
        <Fade in timeout={delay}>
            <ListItemButton divider selected={activeChat === chat.id} onClick={() => setActiveChat(chat.id)}>
                <Grid container gap={1.5}>
                    <Grid item>
                        <CommonAvatar src={avatar} size={45} text={displayName} />
                    </Grid>
                    <Grid item flex={1}>
                        <Grid container direction="column">
                            <Grid item>
                                <Grid container justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="subtitle1">{displayName}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="caption">{lastMsgTime}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container justifyContent="space-between">
                                        <Grid item>
                                            <Typography sx={classes.message} variant="subtitle2">{lastMsgDisplay}</Typography>
                                        </Grid>
                                        <Grid item>
                                            {(!chat.isGroup && chat.members[0].isOnline) && (
                                                <CircleIcon fontSize="inherit" color="success"/>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </ListItemButton>
        </Fade>
    );
};

export default ChatListItem;

/* 


<Grid container>
                            <Grid item>
                                <Typography fontcolor="primary">{displayName}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="caption" sx={classes.time}>{lastMsgTime}</Typography>
                            </Grid>
                        </Grid>

<Grid container direction="row">
                            <Grid item>
                                <Typography sx={classes.message}>{lastMsgDisplay}</Typography>
                            </Grid>
                            <Grid item>
                                {chat.isGroup ? (
                                    null
                                ) : (
                                    <CircleIcon fontSize="inherit" color={true ? "success" : "disabled"}/>
                                )}
                            </Grid>
                        </Grid>






<Grid item>
                        <CommonAvatar src={avatar} size={45} text={displayName} />
                    </Grid>
                    <Grid item flex={1}>
                        <Typography fontColor="primary">{displayName}</Typography>
                        <Typography variant="caption" sx={classes.time}>{lastMsgTime}</Typography>
                    </Grid>
                    <Grid item display="flex" direction="column" alignItems="center">
                        <Typography sx={classes.message}>{lastMsgDisplay}</Typography>
                        <Box sx={classes.icon}>
                            {chat.isGroup ? (
                                null
                            ) : (
                                <CircleIcon fontSize="inherit" color={true ? "success" : "disabled"}/>
                            )}
                        </Box>
                    </Grid>

*/