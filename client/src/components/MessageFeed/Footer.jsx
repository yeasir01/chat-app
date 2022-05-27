import React from "react";
import useStore from "../../hooks/useStore.jsx";
import useSocket from "../../hooks/useSocket.jsx";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import EmojiPopover from "./EmojiPopover.jsx";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";

const useStyles = () => ({
    input: {
        py: 2,
        pr: 2,
        overflow: "hidden",
        "& fieldset": {
            borderRadius: 10,
        },
    },
    icon: {
        transform: "rotate(-50deg)"
    }
});

const Footer = () => {
    const [input, setInput] = React.useState("");

    const addMessage = useStore((state) => state.addMessage);
    const isConnected = useStore((state) => state.isConnected);
    const activeChat = useStore((state) => state.activeChat);
    const socket = useSocket((state) => state.socket);
    const user = useStore((state) => state.user);

    const classes = useStyles();

    const keyPress = React.useRef({
        Shift: false,
        Enter: false,
    });

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

    const sendMessage = () => {
        if (input.trim() === "") return;

        if (!isConnected) return;

        const isoDate = new Date().toISOString();

        const msg = {
            text: input,
            createdAt: isoDate,
            chatId: activeChat,
            user: user,
        };

        socket.emit("message:send", msg);
        addMessage(msg);
        setInput("");
    };

    return (
        <Grid
            container
            width={1}
            justifyContent="space-around"
            alignItems="center"
            padding={1}
            gap={1}
        >
            <Grid item>
                <EmojiPopover handleSelect={handleEmojiSelection} />
            </Grid>
            <Grid item xs>
                <TextField
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onKeyUp={handleKeyUp}
                    disabled={!isConnected}
                    value={input}
                    fullWidth
                    placeholder="Type a message..."
                    sx={classes.input}
                    size="medium"
                    multiline
                    maxRows={4}
                    InputProps={{
                        sx: { paddingLeft: 3 },
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    sx={classes.icon}
                                    onClick={sendMessage}
                                    disabled={!isConnected}
                                >
                                    <SendOutlinedIcon color="primary" />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    autoFocus
                />
            </Grid>
        </Grid>
    );
};

export default Footer;