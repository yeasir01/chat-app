import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import useStore from "../../hooks/useStore.jsx";
import Typography from "@mui/material/Typography";
import ConnectionBadge from "./ConnectionBadge.jsx";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';

const useStyles = () => ({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: 14,
        paddingBottom: 0
    },
    item: {
        display: "flex",
        alignItems: "center",
        gap: 1,
    },
    avatar: {
        width: 30,
        height: 30,
    },
    text: {
        fontSize: 24,
        fontWeight: 600,
    },
     icon: {
         color: "primary.main"
     }
});

const ConversationFeedHeader = () => {
    const user = useStore(state => state.user);

    const classes = useStyles();
    
    return (
        <Box sx={classes.root}>
            <Box sx={classes.item}>
                <ConnectionBadge>
                    <Avatar src={user.avatar} sx={classes.avatar} />
                </ConnectionBadge>
            </Box>
                <Typography variant="h1" sx={classes.text}>
                    Chats
                </Typography>
            <Box sx={classes.item}>
                <IconButton>
                    <AddIcon sx={classes.icon} />
                </IconButton>
            </Box>
        </Box>
    );
};

export default ConversationFeedHeader;
