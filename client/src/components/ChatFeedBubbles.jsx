import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const ChatFeedBubbles = ({messages}) => {
    const user = { id: 1 };

    const styles = (isOwner) => ({
        bubble: {
            backgroundColor: isOwner ? "primary.main" : "secondary.main",
            color: isOwner ? "primary.contrastText": "secondary.contrastText",
            borderRadius: isOwner ? "15px 0 20px 15px" : "0 15px 15px 20px",
            px: 3.5,
            py: 1.5,
        },
        text: {
            textAlign: isOwner ? "right" : "left",
            color: "text.secondary",
            fontSize: 12,
            py: .5,
            px: 1,
            whiteSpace: "pre-line"
        },
    });

    return (
        <>
            {messages.map((message) => {
                const isOwner = user.id === message.userID;
                const dateTime = new Date(parseInt(message.createdAt));
                const date = dateTime.toLocaleDateString();
                const time = dateTime.toLocaleTimeString();
                const classes = styles(isOwner);
                
                return (
                    <Grid container width={1} justifyContent={isOwner ? "flex-end" : "flex-start"} key={message.id}>
                        <Grid item sx={{maxWidth: .5}}>
                                <Typography sx={classes.text}>{message.handle}</Typography>
                                <Paper elevation={0} sx={classes.bubble}>
                                    <Typography variant="body1" sx={{whiteSpace: 'pre-line'}}>{message.body}</Typography>
                                </Paper>
                                <Typography sx={classes.text}>
                                    {date} {time}
                                </Typography>
                        </Grid>
                    </Grid>
                );
            })}
        </>
    )
};

export default ChatFeedBubbles;