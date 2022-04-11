import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Divider from "@mui/material/Divider";
import SearchBar from './SearchBar.jsx';

const useStyles = ()=> ({
    root: {
        height: 1,
        borderRadius: 2,
        overflow: "hidden"
    },
    search: {
        padding: 2
    },
    list: {
        padding:0
    }
})

const ChatList = () => {
    const [selected, setSelected] = React.useState(0);

    const classes = useStyles();

    const handleSelection = (idx) => {
        setSelected(idx)
    }

    return (
        <Paper elevation={1} sx={classes.root}>
            <List sx={classes.list}>
                <Box sx={classes.search}>
                    <SearchBar placeHolder="find conversations"/>
                </Box>
                <Divider />
                <ListItemButton selected={selected === 0} onClick={()=>handleSelection(0)}>
                    <ListItemAvatar>
                        <Avatar src="https://res.cloudinary.com/culturemap-com/image/upload/ar_4:3,c_fill,g_faces:center,w_980/v1515002138/photos/267296_original.jpg" />
                    </ListItemAvatar>
                    <ListItemText primary="Rick Smith" secondary="hello welcome back would you like..." />
                </ListItemButton>
                <Divider />
                <ListItemButton selected={selected === 1} onClick={()=>handleSelection(1)}>
                    <ListItemAvatar>
                        <Avatar src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/madmike-002test-1598471669.jpg?crop=0.454xw:0.907xh;0.106xw,0&resize=640:*" />
                    </ListItemAvatar>
                    <ListItemText primary="Mike Hughes" secondary="Jan 9, 2014" />
                </ListItemButton>
                <Divider />
                <ListItemButton selected={selected === 2} onClick={()=>handleSelection(2)}>
                    <ListItemAvatar>
                        <Avatar src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F20%2F2020%2F03%2Fmike-tyson-2.jpg&q=60" />
                    </ListItemAvatar>
                    <ListItemText primary="Mike Tyson" secondary="Jan 9, 2014" />
                </ListItemButton>
                <Divider />
            </List>
        </Paper>
    );
};

export default ChatList;
