import React, { useRef } from "react";
import Box from "@mui/system/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Divider from "@mui/material/Divider";
import MessageBubbles from "./MessageBubbles.jsx";
import ListItemText from "@mui/material/ListItemText";
import EmojiComponent from "./EmojiComponent.jsx";
import LoaderBoundary from "./LoaderBoundary.jsx";
import { useStore, types } from "../hooks/useStore.jsx";
import useFetch from "../hooks/useFetch.jsx";

const useStyles = () => ({
    root: {
        height: 1,
        borderRadius: 2,
        overflow: "hidden",
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
        p: 0,
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
        width: 45,
    },
});

const ChatFeed = () => {
    const [input, setInput] = React.useState("");

    const user = useStore(state=> state.user);
    const dispatch = useStore(state=> state.dispatch);
    const activeChatId = useStore(state=> state.activeChatId);
    
    const { response, isLoading, fetchRequest } = useFetch();

    const keyPress = useRef({
        Shift: false,
        Enter: false,
    });

    const classes = useStyles();

/*     React.useEffect(() => {
        socket.on("message:receive", (message) => {
            dispatch({type: types.ADD_CHAT, payload: message})
        });
    }, [socket]); */

    React.useEffect(() => {
        if (response.ok) {
            dispatch({
                type: types.SET_MESSAGES, 
                payload: response.data
            })
        }
    }, [response]);

    React.useEffect(() => {
        if (activeChatId) {
            fetchRequest(`/api/messages?chat-id=${activeChatId}`);
        }
    }, [activeChatId, fetchRequest]);

    const sendMessage = () => {
        if (input.trim() === "") return;

        const isoDate = new Date().toISOString();

        const message = {
            chatId: activeChatId,
            text: input,
            createdAt: isoDate,
            user: user,
        };

        //socket.emit("message:send", message);

        dispatch({type: types.ADD_MESSAGE, payload: message});
        setInput("");
    };

    const handleKeyDown = (event) => {
        if (event.key === "Shift" || event.key === "Enter") {
            keyPress.current[event.key] = true;
        }

        if (keyPress.current["Enter"] && !keyPress.current["Shift"]) {
            event.preventDefault();
            sendMessage();
        }
    };

    const handleKeyUp = (event) => {
        if (event.key === "Shift" || event.key === "Enter") {
            keyPress.current[event.key] = false;
        }
    };

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleEmojiSelection = (emoji) => {
        setInput((prevState) => prevState + emoji);
    };

    return (
        <Paper elevation={1} sx={classes.root}>
            <Grid container direction="column" height={1}>
                <Grid item sx={classes.headerGroup}>
                    <Box sx={classes.headerItem}>
                        <Avatar sx={classes.avatar} src={"AvatarLinkHere"} />
                        <ListItemText primary={"Title Here"} />
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
                <Grid item xs padding={4} sx={{ overflowY: "auto" }}>
                    <LoaderBoundary loading={isLoading}>
                        <MessageBubbles/>
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
                            <EmojiComponent handleSelect={handleEmojiSelection} />
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
                                    sx: { paddingLeft: 3 },
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
