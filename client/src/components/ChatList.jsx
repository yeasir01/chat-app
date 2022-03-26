import React from "react";
import Paper from "@mui/material/Paper";
//import Box from "@mui/material/Box";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from '@mui/material/Toolbar';
import SearchBar from './SearchBar.jsx';

const useStyles = ()=> ({
    root: {
        height: "100vh"
    },
    appBar: {
        height: "72px",
        bgcolor: "background.paper",
        boxShadow: "none",
        color: "text.primary"
    }
})

const ChatList = () => {
    const [selected, setSelected] = React.useState(0);

    const classes = useStyles();

    const handleSelection = (idx) => {
        setSelected(idx)
    }

    return (
        <Paper elevation={1} sx={classes.root} square>
            <AppBar position="static" sx={classes.appBar} elevation={1}>
                <Toolbar>
                    <SearchBar />
                </Toolbar>
            </AppBar>
            <List sx={{p:0}}>
                <Divider />
                <ListItemButton selected={selected === 0} onClick={()=>handleSelection(0)}>
                    <ListItemAvatar>
                        <Avatar src="https://www.peterbe.com/avatar.random.png" />
                    </ListItemAvatar>
                    <ListItemText primary="Rick Smith" secondary="hello welcome back would you like..." />
                </ListItemButton>
                <Divider />
                <ListItemButton selected={selected === 1} onClick={()=>handleSelection(1)}>
                    <ListItemAvatar>
                        <Avatar src="https://www.peterbe.com/avatar.random.png" />
                    </ListItemAvatar>
                    <ListItemText primary="Mike Hughes" secondary="Jan 9, 2014" />
                </ListItemButton>
                <Divider />
                <ListItemButton selected={selected === 2} onClick={()=>handleSelection(2)}>
                    <ListItemAvatar>
                        <Avatar src="https://www.peterbe.com/avatar.random.png" />
                    </ListItemAvatar>
                    <ListItemText primary="Mike Tyson" secondary="Jan 9, 2014" />
                </ListItemButton>
                <Divider />
            </List>
        </Paper>
    );
};

export default ChatList;
