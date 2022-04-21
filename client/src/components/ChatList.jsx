import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Divider from "@mui/material/Divider";
import SearchBar from './SearchBar.jsx';
import { truncate } from "../util/helpers.js"

import groupMock from "../mock/groups.js";

const useStyles = ()=> ({
    root: {
        borderRadius: 2,
        overflow: "hidden",
        height: 1
    },
    search: {
        padding: 2
    },
    primaryText: {
        color: "text.primary"
    },
    secondaryText: {
        color: "text.secondary"
    },
})

const ChatList = ({setConversation}) => {
    const classes = useStyles();

    return (
        <Paper elevation={1} sx={classes.root}>
            <Grid container direction="column" height={1}>
                <Grid item sx={classes.search}>
                    <SearchBar placeHolder="find conversations"/>
                </Grid>
                <Grid item>
                    <Divider />
                </Grid>
                <Grid item xs sx={{overflowY: "auto"}}>
                    <List disablePadding>
                        {groupMock.map( group => {
                            const msg = `${group.lastMessage.name}: ${group.lastMessage.message}`;
                            
                            return (
                                <ListItemButton divider selected={false} key={group.groupID} onClick={()=> setConversation(group)}>
                                    <ListItemAvatar>
                                        <Avatar src={group.img} />
                                    </ListItemAvatar>
                                    <ListItemText 
                                        primary={group.groupName} 
                                        primaryTypographyProps={classes.primaryText}
                                        secondary={truncate(msg, 40)} 
                                        secondaryTypographyProps={classes.secondaryText}
                                    />
                                </ListItemButton>
                            )
                        })}
                    </List>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ChatList;
