import React from 'react';
import Paper from '@mui/material/Paper';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SettingsBrightnessOutlinedIcon from '@mui/icons-material/SettingsBrightnessOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import useTheme from "../hooks/useTheme.jsx";
import useAuth from "../hooks/useAuth.jsx";
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';


const useStyle = () =>({
    root: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        overflow: "hidden",
        height: 1,
        borderRadius: 2,
    },
    list: {
        padding:0
    },
    listItem: {
        padding:0,
    },
    listItemButton: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    listItemText: {
        color: "primary.main"
    },
    icon: {
        color: "primary.main"
    }
});

const SideBar = () => {
    const [ changeTheme ] = useTheme();
    const [selected, setSelected] = React.useState(0);
    const { logout } = useAuth();
    
    const classes = useStyle();

    const handleSelection = (idx) => {
        setSelected(idx)
    }

    return (
        <Paper sx={classes.root} elevation={1}>
            <List sx={classes.list}>
                <ListItem sx={classes.listItem} selected={selected === 0} onClick={()=>handleSelection(0)}>
                    <ListItemButton sx={classes.listItemButton}>
                        <ForumOutlinedIcon/>
                        <Typography>Chats</Typography>
                    </ListItemButton>
                </ListItem>
                <ListItem sx={classes.listItem} selected={selected === 1} onClick={()=>handleSelection(1)}>
                    <ListItemButton sx={classes.listItemButton}>
                        <PeopleAltOutlinedIcon />
                        <Typography>People</Typography>
                    </ListItemButton>
                </ListItem>
                <ListItem sx={classes.listItem} selected={selected === 2} onClick={()=>handleSelection(2)}>
                    <ListItemButton sx={classes.listItemButton}>
                        <ManageAccountsOutlinedIcon />
                        <Typography>My Profile</Typography>
                    </ListItemButton>
                </ListItem>
                <ListItem sx={classes.listItem}>
                    <ListItemButton sx={classes.listItemButton} onClick={changeTheme}>
                        <SettingsBrightnessOutlinedIcon />
                        <ListItemText secondary="Theme" sx={classes.listItemText} />
                    </ListItemButton>
                </ListItem>
            </List>
            <List sx={classes.list}>
                <Divider variant="middle" />
                <ListItem sx={classes.listItem}>
                        <ListItemButton sx={classes.listItemButton} onClick={logout}>
                            <LogoutIcon />
                            <ListItemText secondary="Sign Out" sx={classes.listItemText} />
                        </ListItemButton>
                </ListItem>
            </List>
        </Paper>
    )
};

export default SideBar;