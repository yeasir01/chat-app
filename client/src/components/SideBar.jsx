import React from 'react';
import Box from '@mui/material/Box';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SettingsBrightnessOutlinedIcon from '@mui/icons-material/SettingsBrightnessOutlined';
import useTheme from "../hooks/useTheme.jsx";

const useStyle = () =>({
    root: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        height: "100vh",
        width: "100px",
    },
    list: {
        p:0
    },
    listItem: {
        p:0
    },
    listItemButton: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    }
});

const SideBar = () => {

    const classes = useStyle();
    const [ changeTheme ] = useTheme();

   
    return (
        <Box sx={classes.root}>
            <List sx={classes.list}>
                <ListItem selected={true} sx={classes.listItem}>
                    <ListItemButton sx={classes.listItemButton}>
                        <ChatBubbleOutlineOutlinedIcon />
                        <ListItemText primary="Chats" sx={classes.listItemText} />
                    </ListItemButton>
                </ListItem>
                <ListItem selected={false} sx={classes.listItem}>
                    <ListItemButton sx={classes.listItemButton}>
                        <PeopleAltOutlinedIcon />
                        <ListItemText primary="Contacts" sx={classes.listItemText} />
                    </ListItemButton>
                </ListItem>
                <ListItem selected={false} sx={classes.listItem}>
                    <ListItemButton sx={classes.listItemButton}>
                        <SettingsOutlinedIcon />
                        <ListItemText primary="Settings" sx={classes.listItemText} />
                    </ListItemButton>
                </ListItem>
            </List>
            <List sx={classes.list}>
            <ListItem selected={false} sx={classes.listItem}>
                    <ListItemButton sx={classes.listItemButton} onClick={changeTheme}>
                        <SettingsBrightnessOutlinedIcon />
                        <ListItemText secondary="Theme" sx={classes.listItemText} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    )
};

export default SideBar;