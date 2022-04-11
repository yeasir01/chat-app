import React from "react";
import Box from "@mui/system/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';
import ChatFeedBubbles from "./ChatFeedBubbles.jsx";
import ListItemText from "@mui/material/ListItemText";
import mockChats from "../mock/messages";

const useStyles = () => ({
    root: {
        height: 1,
        borderRadius: 2,
        overflow: "hidden"
    },
    headerGroup: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: 1,
        p: 2,
    },
    headerItem: {
        display: "flex",
        alignItems: "center",
        gap: 1.5,
    },
    title: {
        p:0
    },
    input: {
        py: 2,
        pr: 2,
        overflow: "hidden",
        [`& fieldset`]: {
            borderRadius: 10,
        },
    },
    avatar: {
        height: 45,
        width: 45
    }
});

const ChatArea = () => {
    const classes = useStyles();
    const [chatList, setChatList] = React.useState(mockChats);
    const [message, setMessage] = React.useState("");
    const [mockID, setMockID] = React.useState(9)

    let keysPressed = {
        Shift: false,
        Enter: false
    };

    const handleKeyDown = (event) => {

        if (event.key === "Shift" || event.key === "Enter"){
            keysPressed[event.key] = true;
        }
        
        if (keysPressed["Shift"] && keysPressed["Enter"]){
            return;
        }
        
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    }

    const handleKeyUp = (event) => {
        if (event.key === "Shift" || event.key === "Enter"){
            keysPressed[event.key] = false;
        }
    }

    const handleChange = (event) => {
        setMessage(event.target.value)
    }

    const sendMessage = () => {
        if (message.trim()) {
            const msg = {
                id: mockID,
                body: message,
                createdAt: Date.now(),
                handle: "yeasir01",
                userID: 1
            }
            setMockID(prev => prev + 1);
            setChatList(prev => [...prev, msg]);
            setMessage("");
        }
    }

    return (
        <Paper elevation={1} sx={classes.root}>
            <Grid container direction="column" height={1}>
                <Grid item sx={classes.headerGroup}>
                    <Box sx={classes.headerItem}>
                        <Badge
                            invisible={false}
                            color="success"
                            overlap="circular"
                            variant="dot"
                        >
                            <Avatar sx={classes.avatar} src="https://res.cloudinary.com/culturemap-com/image/upload/ar_4:3,c_fill,g_faces:center,w_980/v1515002138/photos/267296_original.jpg" />
                        </Badge>
                        <ListItemText primary="Rick Smith" secondary="ricky1987" />
                    </Box>
                    <Box>
                        <IconButton>
                            <DeleteOutlinedIcon />
                        </IconButton>
                    </Box>
                </Grid>
                <Grid item>
                    <Divider />
                </Grid>
                <Grid item xs padding={3} sx={{overflowY: "auto"}}>
                    <ChatFeedBubbles messages={chatList} />
                </Grid>
                <Grid item>
                    <Divider />
                </Grid>
                <Grid item>
                    <Grid
                        container
                        width={1}
                        justifyContent="space-around"
                        alignItems="center"
                        padding={1}
                        gap={1}
                    >
                        <Grid item>
                            <IconButton size="large">
                                <InsertEmoticonIcon color="warning" fontSize="inherit"/>
                            </IconButton>
                        </Grid>
                        <Grid item xs>
                            <TextField
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                                onKeyUp={handleKeyUp}
                                value={message}
                                fullWidth
                                placeholder="Type a message"
                                sx={classes.input}
                                size="medium"
                                multiline
                                maxRows={4}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={sendMessage}>
                                                <SendOutlinedIcon color="primary" />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ChatArea;
