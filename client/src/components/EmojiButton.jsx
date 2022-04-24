import React from "react";
import IconButton from "@mui/material/IconButton";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import emojis from "../assets/emojis.js";

const useStyles = () => ({
    popover: {
        overflow: "hidden",
    },
    wrapper: {
        width: 200,
        height: 200,
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        p: 1,
    },
    button: {
        width: 48,
        height: 48,
    }
});

const EmojiButton = ({handleSelect}) => {
    const [anchor, setAnchor] = React.useState(null);

    const classes = useStyles();

    const handleClick = (event) => {
        setAnchor(event.currentTarget);
    }

    const handleClose = () => {
        setAnchor(null);
    };

    const isOpen = Boolean(anchor);
    const id = isOpen ? 'emoji-popover' : undefined;

    return (
        <>
            <IconButton size="large" onClick={handleClick}>
                <InsertEmoticonIcon color="warning" fontSize="inherit" />
            </IconButton>
            <Popover 
                id={id} 
                open={isOpen} 
                anchorEl={anchor} 
                onClose={handleClose} 
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                sx={classes.popover}
            >
                <Box sx={classes.wrapper}>
                    {emojis.map(( emoji, idx )=>(
                        <IconButton sx={classes.button} key={idx} onClick={(e)=> handleSelect(emoji)}>
                            {emoji}
                        </IconButton>
                    ))}
                </Box>
            </Popover>
        </>
    );
};

export default EmojiButton;
