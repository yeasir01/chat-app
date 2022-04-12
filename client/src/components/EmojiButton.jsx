import React from "react";
import IconButton from "@mui/material/IconButton";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import emojis from "../assets/emojis.js";

const useStyles = () => ({
    popover: {
        
    },
    emojiWrapper: {
        width: "300px",
        height: "200px",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        p: 2,
    },
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
                <Box sx={classes.emojiWrapper}>
                    {emojis.map(( emoji, idx )=>(
                        <IconButton key={idx} onClick={(e)=> handleSelect(emoji)}>
                            {emoji}
                        </IconButton>
                    ))}
                </Box>
            </Popover>
        </>
    );
};

export default EmojiButton;
