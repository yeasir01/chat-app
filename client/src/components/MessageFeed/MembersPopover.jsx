import React from "react";
import Popover from "@mui/material/Popover";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import useStore from "../../hooks/useStore.jsx";
import CommonAvatar from "../common/CommonAvatar.jsx";
import ListSubheader from "@mui/material/ListSubheader";

const useStyles = () => ({
    root: {
        "& .MuiPopover-paper": {
            borderRadius: 3,
        },
    },
    list: {
        padding: 1,
        width: "100%",
        bgcolor: "background.paper",
    },
    icon: {
        paddingLeft: 3
    }
});

const MembersPopover = () => {
    const [anchor, setAnchor] = React.useState(null);

    const chat = useStore((state) => state.getCurrentChat());
    const user = useStore((state) => state.user);

    const classes = useStyles();

    const handleOpen = (event) => {
        setAnchor(event.currentTarget);
    };

    const handleClose = () => {
        setAnchor(null);
    };

    const open = Boolean(anchor);

    return (
        <>
            <IconButton onClick={handleOpen}>
                <PeopleAltOutlinedIcon />
            </IconButton>
            <Popover
                open={open}
                onClose={handleClose}
                sx={classes.root}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                anchorEl={anchor}
            >
                <List
                    sx={classes.list}
                    dense
                    component="nav"
                    aria-labelledby="member-list-subheader"
                    subheader={
                        <ListSubheader
                            component="div"
                            id="member-list-subheader"
                        >
                            Chat Members
                        </ListSubheader>
                    }
                >
                    <ListItem>
                        <ListItemAvatar>
                            <CommonAvatar
                                src={user.avatar}
                                text={user.firstName + " " + user.lastName}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={user.firstName + " " + user.lastName}
                            secondary={user.handle}
                        />
                    </ListItem>

                    {chat.members.map((member) => {
                        return (
                            <ListItem
                                key={member.id}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete">
                                        <PersonRemoveIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>
                                    <CommonAvatar
                                        src={member.avatar}
                                        text={
                                            member.firstName +
                                            " " +
                                            member.lastName
                                        }
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        member.firstName + " " + member.lastName
                                    }
                                    secondary={member.handle}
                                />
                            </ListItem>
                        );
                    })}
                </List>
            </Popover>
        </>
    );
};

export default MembersPopover;
