import React from 'react';
import Paper from '@mui/material/Paper';
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
    },
    list: {
        p:0
    },
    listItem: {
        p:0,
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
    const [selected, setSelected] = React.useState(0);

    const handleSelection = (idx) => {
        setSelected(idx)
    }

    return (
        <Paper sx={classes.root} elevation={0} square>
            <List sx={classes.list}>
                <ListItem sx={classes.listItem} selected={selected === 0} onClick={()=>handleSelection(0)}>
                    <ListItemButton sx={classes.listItemButton}>
                        <ChatBubbleOutlineOutlinedIcon />
                        <ListItemText primary="Chats" sx={classes.listItemText} />
                    </ListItemButton>
                </ListItem>
                <ListItem sx={classes.listItem} selected={selected === 1} onClick={()=>handleSelection(1)}>
                    <ListItemButton sx={classes.listItemButton}>
                        <PeopleAltOutlinedIcon />
                        <ListItemText primary="Contacts" sx={classes.listItemText} />
                    </ListItemButton>
                </ListItem>
                <ListItem sx={classes.listItem} selected={selected === 2} onClick={()=>handleSelection(2)}>
                    <ListItemButton sx={classes.listItemButton}>
                        <SettingsOutlinedIcon />
                        <ListItemText primary="Settings" sx={classes.listItemText} />
                    </ListItemButton>
                </ListItem>
            </List>
            <List sx={classes.list}>
            <ListItem sx={classes.listItem}>
                    <ListItemButton sx={classes.listItemButton} onClick={changeTheme}>
                        <SettingsBrightnessOutlinedIcon />
                        <ListItemText secondary="Theme" sx={classes.listItemText} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Paper>
    )
};

export default SideBar;