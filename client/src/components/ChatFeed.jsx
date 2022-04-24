import React from "react";
import Box from "@mui/system/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';
import ChatFeedBubbles from "./ChatFeedBubbles.jsx";
import ListItemText from "@mui/material/ListItemText";
import EmojiButton from "./EmojiButton.jsx";
import LoaderBoundary from "./LoaderBoundary.jsx";
import useFetch from "../hooks/useFetch.jsx";

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
    },
});

const keyPress = {
    Shift: false,
    Enter: false
}

const ChatFeed = (props) => {
    const [messages, setMessages] = React.useState([]);
    const [input, setInput] = React.useState("");
    const [response, error, isLoading, request] = useFetch();    
    
    const isNotEmpty = Boolean(input.trim());
    const classes = useStyles();

    React.useEffect(() => {
        if(response?.ok){
            setMessages(response.data)
        }
    },[response])

    React.useEffect(()=>{
        request.get(`/api/messages?chatId=${props.details.id}`)
    },[props.details.id])

    const sendMessage = () => {
        if (isNotEmpty) {
            const newMessage = {
                id: 121,
                body: input,
                createdAt: Date.now(),
                handle: "yeasir01",
                userID: 1
            }
            setMessages(prevMessages => [...prevMessages, newMessage]);
            setInput("");
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === "Shift" || event.key === "Enter") {
            keyPress[event.key] = true;
        }

        if (keyPress["Enter"] && !keyPress["Shift"]) {
            event.preventDefault();
            sendMessage();
        }
    }

    const handleKeyUp = (event) => {
        if (event.key === "Shift" || event.key === "Enter"){
            keyPress[event.key] = false;
        }
    }

    const handleInputChange = (event) => {
        setInput(event.target.value)
    }

    const handleEmojiSelection = (emoji) => {
        setInput(prev => prev + emoji);
    }

    return (
        <Paper elevation={1} sx={classes.root}>
            <Grid container direction="column" height={1}>
                <Grid item sx={classes.headerGroup}>
                    <Box sx={classes.headerItem}>
                        <Avatar sx={classes.avatar} src={props.details.avatar} />
                        <ListItemText primary={props.details.displayName}/>
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
                <Grid item xs padding={4} sx={{overflowY: "auto"}}>
                    <LoaderBoundary loading={isLoading}>
                        <ChatFeedBubbles messages={messages} />
                    </LoaderBoundary>
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
                            <EmojiButton handleSelect={handleEmojiSelection}/>
                        </Grid>
                        <Grid item xs>
                            <TextField
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                onKeyUp={handleKeyUp}
                                value={input}
                                fullWidth
                                placeholder="Type a message"
                                sx={classes.input}
                                size="medium"
                                multiline
                                maxRows={4}
                                InputProps={{
                                    sx: {pl: 3},
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={sendMessage}>
                                                <SendOutlinedIcon color="primary" />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                autoFocus
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ChatFeed;
