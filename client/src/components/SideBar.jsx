import React from 'react';
import Paper from '@mui/material/Paper';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
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
        height: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 2,
    },
    listItem: {
        display: "flex",
        flexDirection: "column",
    },
    listItemButton: {
        borderRadius: 6,
        overflow: "hidden",
        color: "text.secondary",
        "&.Mui-selected": {
            backgroundColor: "primary.main",
            color: "primary.contrastText",
            "&:hover": {
                backgroundColor: "primary.light"
            }
        }
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
        <Paper elevation={1} sx={classes.root}>
            <List>
                <ListItem sx={classes.listItem}>
                    <ListItemButton sx={classes.listItemButton} selected={selected === 0} onClick={()=>handleSelection(0)} >
                        <ForumOutlinedIcon/>
                    </ListItemButton>
                    <Typography variant='caption'>Chats</Typography>
                </ListItem>
                <ListItem sx={classes.listItem}>
                    <ListItemButton sx={classes.listItemButton} selected={selected === 1} onClick={()=>handleSelection(1)}>
                        <PeopleAltOutlinedIcon />
                    </ListItemButton>
                    <Typography variant='caption'>People</Typography>
                </ListItem>
                <ListItem sx={classes.listItem}>
                    <ListItemButton sx={classes.listItemButton} selected={selected === 2} onClick={()=>handleSelection(2)}>
                        <ManageAccountsOutlinedIcon />
                    </ListItemButton>
                    <Typography variant='caption'>Profile</Typography>
                </ListItem>
                <ListItem sx={classes.listItem} >
                    <ListItemButton sx={classes.listItemButton} onClick={changeTheme}>
                        <SettingsBrightnessOutlinedIcon />
                    </ListItemButton>
                    <Typography variant='caption'>Theme</Typography>
                </ListItem>
            </List>
            <List>
                <Divider variant="middle" />
                <ListItem sx={classes.listItem} >
                    <ListItemButton sx={classes.listItemButton} onClick={logout}>
                        <LogoutIcon />
                    </ListItemButton>
                    <Typography variant='caption'>Sign Out</Typography>
                </ListItem>
            </List>
        </Paper>
    )
};

export default SideBar;