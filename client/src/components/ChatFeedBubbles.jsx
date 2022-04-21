import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Tooltip from '@mui/material/Tooltip';

const ChatFeedBubbles = ({messages}) => {
    const user = { id: 1 };

    const lastMessageRef = React.useRef(null);

    React.useEffect(() => {
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const styles = (isOwner) => ({
        bubble: {
            backgroundColor: isOwner ? "primary.main" : "secondary.main",
            color: isOwner ? "primary.contrastText": "secondary.contrastText",
            cursor: "pointer",
            borderRadius: isOwner ? "20px 20px 0 20px": "20px 20px 20px 0",
            px: 2,
            py: 1,
        },
        toolTipTitle: {
            textAlign: isOwner ? "right" : "left",
        },
        toolTipBody: {
            textAlign: isOwner ? "right" : "left"
        },
    });

    return (
        <>
            {messages.map((message) => {
                const isMessageOwner = user.id === message.userID;
                const uniqueKey = message.id + message.createdAt;
                const date = new Date(parseInt(message.createdAt));
                const time = date.toLocaleTimeString([], {
                    year: 'numeric', 
                    month: 'numeric', 
                    day: 'numeric', 
                    hour: '2-digit', 
                    minute: '2-digit'
                });
                
                const classes = styles(isMessageOwner);
                
                return (
                    <Grid container width={1} justifyContent={isMessageOwner ? "flex-end" : "flex-start"} key={uniqueKey}>
                        <Grid item sx={{maxWidth: 0.5, my: 1}}>
                               <Tooltip
                                placement={isMessageOwner ? "left" : "right"}
                                title={
                                        <>
                                            <Typography variant="subtitle2" sx={classes.toolTipTitle}>{message.handle}</Typography>
                                            <Typography variant="caption" sx={classes.toolTipBody}>{time}</Typography>                            
                                        </>
                                } arrow >
                                    <Paper elevation={0} sx={classes.bubble}>
                                        <Typography variant="body1" sx={{whiteSpace: 'pre-line'}}>{message.body}</Typography>
                                    </Paper>
                                </Tooltip>
                        </Grid>
                    </Grid>
                );
            })}
            <div ref={lastMessageRef}></div>
        </>
    )
};

export default ChatFeedBubbles;