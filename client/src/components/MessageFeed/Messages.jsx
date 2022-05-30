import React from 'react';
import { parseISO, format } from "date-fns";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import useStore from "../../hooks/useStore.jsx";
import CommonAvatar from "../common/CommonAvatar.jsx";

const Messages = () => {
    const user = useStore(state => state.user);
    const messages = useStore(state => state.messages);
    const lastMessageRef = React.useRef(null);

    React.useLayoutEffect(() => {
        lastMessageRef.current.scrollIntoView();
    }, []);
    
    React.useEffect(() => {
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const styles = React.useCallback((loggedInUser) => ({
        root: {
            width: 1,
            display: "flex",
            flexDirection: loggedInUser ? "row-reverse" : "row",
            flexWrap: "nowrap",
            gap: 1,
            my: 2
        },
        avatar:{
            display: "flex",
            alignSelf: "flex-end",
            paddingBottom: 0.7
        },
        bubble: {
            backgroundColor: loggedInUser ? "primary.main" : "background.default",
            color: loggedInUser ? "primary.contrastText": "text.primary",
            borderRadius: loggedInUser ? "20px 20px 3px 20px": "20px 20px 20px 3px",
            px: 2.5,
            py: 1.5,
        },
        time: {
            textAlign: loggedInUser ? 'right' : "left",
        },
        text: {
            whiteSpace: 'pre-line',
            textAlign: loggedInUser ? 'right' : "left"
        }
    }),[]);
    
    return (
        <>
            {messages.map((message, index) => {
                const isLoggedInUser = user.id === message.user.id;
                const firstName = message.user.firstName;
                const lastName = message.user.lastName;
                const avatar = message.user.avatar;
                const title = isLoggedInUser ? "me" : firstName + " " + lastName;
                const time = format(parseISO(message.createdAt), "MMM dd yy hh:mm aa");
                
                const classes = styles(isLoggedInUser);
                
                return (
                    <Grid container sx={classes.root} key={index}>
                        <Grid item sx={classes.avatar}>
                            <CommonAvatar size={50} src={avatar} text={title} />
                        </ Grid>
                        <Grid item>
                            <Box component="div">
                                <Box sx={classes.bubble}>
                                    <Typography sx={classes.text}>{message.text}</Typography>
                                </Box>
                            </Box>
                            <Box component="div">
                                <Box sx={classes.time}>
                                    <Typography variant="caption">{time}</Typography>
                                </Box>
                            </Box>
                        </ Grid>
                    </ Grid>
                );
            })}
            
            <div ref={lastMessageRef}></div>
        </>
    )
}

export default Messages;