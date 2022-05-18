import React from "react";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import useStore from "../hooks/useStore.jsx";
import Avatar from '@mui/material/Avatar';
import Paper from "@mui/material/Paper"

const MessageBubbles = () => {
    const user = useStore(state => state.user);
    const messages = useStore(state=> state.messages);
    
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
                const isOwner = user.id === message.user.id;
                const firstName = message.user.firstName;
                const lastName = message.user.lastName;
                const avatar = message.user.avatar;
                const fullName = isOwner ? "me" : firstName.split(' ')[0][0] + lastName.split(' ')[0][0];

                const classes = styles(isOwner);
                
                return (
                    <Grid container width={1} justifyContent={isOwner ? "flex-end" : "flex-start"} key={index}>
                        <Grid item xs={12} lg={9} sx={{my: 1.5}}>
                            <Box sx={classes.wrapper}>
                                <Avatar sx={{ width: 35, height: 35, fontSize: "1rem" }} src={avatar}>
                                    {fullName}
                                </Avatar>
                                <Paper sx={classes.bubble} elevation={0}>
                                    <Typography variant="body1" sx={{whiteSpace: 'pre-line'}}>{message.text}</Typography>
                                </Paper>
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