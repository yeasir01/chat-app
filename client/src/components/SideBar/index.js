import React from "react";
import Paper from "@mui/material/Paper";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Link, useLocation } from "react-router-dom";
import useTheme from "../../hooks/useTheme.jsx";
import useStore from "../../hooks/useStore.jsx";

const useStyle = () => ({
    root: {
        height: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 2,
        boxShadow: "none"
    },
    listItem: {
        display: "flex",
        flexDirection: "column",
    },
    listItemButton: {
        borderRadius: 5,
        overflow: "hidden",
        color: "text.secondary",
        "&.Mui-selected": {
            backgroundColor: "primary.main",
            color: "primary.contrastText",
            "&:hover": {
                backgroundColor: "primary.light",
            },
        },
    },
});

const SideBar = () => {
    const theme = useTheme(state=> state.mode);
    const setTheme = useTheme(state=> state.setTheme);

    const location = useLocation();
    const logout = useStore(state => state.logout);

    const classes = useStyle();

    // Move this to global store
    const handleSignOut = async () => {
        await fetch("/api/auth/logout", {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        logout();
    };

    const changeTheme = () => {
        theme === "light" ? setTheme("dark") : setTheme("light")
    }

    return (
        <Paper elevation={1} sx={classes.root}>
            <List>
                <ListItem sx={classes.listItem}>
                    <ListItemButton
                        sx={classes.listItemButton}
                        selected={location.pathname === "/chats"}
                        component={Link}
                        to="/chats"
                    >
                        <ForumOutlinedIcon />
                    </ListItemButton>
                    <Typography variant="caption">Chats</Typography>
                </ListItem>
                <ListItem sx={classes.listItem}>
                    <ListItemButton
                        sx={classes.listItemButton}
                        selected={location.pathname === "/people"}
                        component={Link}
                        to="/people"
                    >
                        <PeopleAltOutlinedIcon />
                    </ListItemButton>
                    <Typography variant="caption">People</Typography>
                </ListItem>
                <ListItem sx={classes.listItem}>
                    <ListItemButton
                        sx={classes.listItemButton}
                        selected={location.pathname === "/profile"}
                        component={Link}
                        to="/profile"
                    >
                        <ManageAccountsOutlinedIcon />
                    </ListItemButton>
                    <Typography variant="caption">Profile</Typography>
                </ListItem>
                <ListItem sx={classes.listItem}>
                    <ListItemButton
                        sx={classes.listItemButton}
                        onClick={changeTheme}
                    >
                        <SettingsBrightnessOutlinedIcon />
                    </ListItemButton>
                    <Typography variant="caption">Theme</Typography>
                </ListItem>
            </List>
            <List>
                <Divider variant="middle" />
                <ListItem sx={classes.listItem}>
                    <ListItemButton
                        sx={classes.listItemButton}
                        onClick={handleSignOut}
                    >
                        <LogoutIcon />
                    </ListItemButton>
                    <Typography variant="caption">Sign Out</Typography>
                </ListItem>
            </List>
        </Paper>
    );
};

export default SideBar;
