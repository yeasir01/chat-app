import React from "react";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import useAuth from "../hooks/useAuth.jsx";
import Avatar from '@mui/material/Avatar';
import { getInitials, convertTime } from "../util/helpers.js";

const MessageBubbles = ({messages}) => {
    const { auth } = useAuth();

    const lastMessageRef = React.useRef(null);

    React.useLayoutEffect(() => {
        lastMessageRef.current.scrollIntoView();
    }, []);
    
    React.useEffect(() => {
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const styles = (isOwner) => ({
        wrapper: {
            display: "flex",
            flexDirection: isOwner ? "row-reverse" : "row",
            alignItems: "flex-end",
            gap: 1
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
            {messages.map((message, index) => {
                const isOwner = auth.user.id === message.user.id;
                const firstName = message.user.firstName || "";
                const lastName = message.user.lastName || "";
                const avatar = message.user.avatar || "";
                const initials = isOwner ? "ME" : getInitials(firstName, lastName);
                const time = convertTime(message.createdAt);

                const classes = styles(isOwner);
                
                return (
                    <Grid container width={1} justifyContent={isOwner ? "flex-end" : "flex-start"} key={index}>
                        <Grid item sx={{maxWidth: 0.5, my: 1}}>
                            <Box sx={classes.wrapper}>
                                <Avatar sx={{ width: 35, height: 35, fontSize: "1rem" }} src={avatar}>
                                    {initials}
                                </Avatar>
                                <Box sx={classes.bubble}>
                                    <Typography variant="body1" sx={{whiteSpace: 'pre-line'}}>{message.text}</Typography>
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

export default React.memo(MessageBubbles);