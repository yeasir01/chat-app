import React from "react";
import Box from "@mui/system/Box";
import Paper from "@mui/material/Paper";
import Toolbar from '@mui/material/Toolbar';
import AppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Badge from '@mui/material/Badge';
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const useStyles = () => ({
    root: {
        height: "100vh",
    },
    appBar: {
        height: "72px",
        bgcolor: "background.paper",
        boxShadow: "none",
        color: "text.primary"
    },
    groupItem: {
        display: "flex",
        alignItems: "center"
    },
    flexGroups: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }
})

const ChatArea = () => {
    const classes = useStyles();

    return (
        <Paper elevation={2} sx={classes.root}>
            <AppBar position="static" sx={classes.appBar} elevation={2}>
                <Toolbar sx={classes.flexGroups}>
                    <Box sx={classes.groupItem}>
                        <Badge invisible={false} color="success" overlap="circular" badgeContent=" " variant="dot">
                            <Avatar src="https://www.peterbe.com/avatar.random.png" />
                        </Badge>
                        <Typography>
                            Mike Hughes
                        </Typography>
                    </Box>
                    <Box sx={classes.groupItem}>
                        <IconButton>
                            <DeleteOutlinedIcon/>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Divider />
        </Paper>
    );
};

export default ChatArea;
