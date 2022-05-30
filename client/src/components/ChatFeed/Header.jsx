import React from "react";
import Box from "@mui/material/Box";
import CommonAvatar from "../common/CommonAvatar.jsx";
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
       fontSize: ".8rem"
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
                    <CommonAvatar 
                        src={user.avatar} 
                        size={30} sx={classes.avatar} 
                        text={user.firstName + " " + user.lastName} 
                    />
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
