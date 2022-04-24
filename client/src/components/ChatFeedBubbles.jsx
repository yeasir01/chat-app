import React from "react";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import useAuth from "../hooks/useAuth.jsx";
import Avatar from '@mui/material/Avatar';
import { getInitials } from "../util/helpers.js";

const ChatFeedBubbles = (props) => {
    const { auth } = useAuth();

    const lastMessageRef = React.useRef(null);

    React.useEffect(() => {
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }, [props.messages]);

    const styles = (isOwner) => ({
        wrapper: {
            display: "flex",
            flexDirection: isOwner ? "row-reverse" : "row",
            alignItems: "flex-end",
            gap: 1.25
        },
        bubble: {
            position: "relative",
            backgroundColor: isOwner ? "primary.main" : "background.default",
            color: isOwner ? "primary.contrastText": "text.primary",
            borderRadius: isOwner ? "20px 20px 3px 20px": "20px 20px 20px 3px",
            px: 2,
            py: 1,        
        },
        date: {
            fontSize: ".7rem"
        }
    });

    return (
        <>
            {props.messages.map((message) => {
                const isOwner = auth.user.id === message.user.id;
                const date = new Date(parseInt(message.createdAt));
                const firstName = message.user.firstName || "";
                const lastName = message.user.lastName || "";
                const avatar = message.user.avatar || "";
                const initials = isOwner ? "ME" : getInitials(firstName, lastName);
                const time = date.toLocaleTimeString([], {
                    year: 'numeric', 
                    month: 'numeric', 
                    day: 'numeric', 
                    hour: '2-digit', 
                    minute: '2-digit'
                });

                const classes = styles(isOwner);
                
                return (
                    <Grid container width={1} justifyContent={isOwner ? "flex-end" : "flex-start"} key={message.id}>
                        <Grid item sx={{maxWidth: 0.5, my: 1}}>
                            <Box sx={classes.wrapper}>
                                <Avatar sx={{ width: 35, height: 35, fontSize: "1rem" }} src={avatar}>
                                    {initials}
                                </Avatar>
                                <Box sx={classes.bubble}>
                                    <Typography variant="body1" sx={{whiteSpace: 'pre-line'}}>{message.body}</Typography>
                                </Box>
                                {/* <Typography variant="caption" sx={classes.date}>{time}</Typography> */}                       
                            </Box>
                        </Grid>
                    </Grid>
                );
            })}
            <div ref={lastMessageRef}></div>
        </>
    )
};

export default ChatFeedBubbles;