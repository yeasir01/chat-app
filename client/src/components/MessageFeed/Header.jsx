import React from "react";
import IconButton from "@mui/material/IconButton";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ListItemText from "@mui/material/ListItemText";
import CommonAvatar from "../common/CommonAvatar.jsx";
import Box from "@mui/system/Box";
import useStore from "../../hooks/useStore.jsx";
import MembersPopover from "./MembersPopover.jsx";
import OptionsPopover from "./OptionsPopover.jsx";

const useStyles = () => ({
    root: {
        display: "flex",
        alignItems: "center",
        gap: 1.5,
    },
    primaryText: {
        color: "text.primary",
    },
    secondaryText: {
        color: "text.secondary",
    },
});

const Header = () => {
    const chat = useStore((state) => state.getCurrentChat());
    const title = chat.isGroup ? chat.title : `${chat.members[0].firstName} ${chat.members[0].lastName}`;
    const source = chat.isGroup ? chat.avatar : chat.members[0].avatar;
    const classes = useStyles();

    return (
        <>
            <Box sx={classes.root}>
                <CommonAvatar sx={classes.avatar} size={45} text={title} src={source} />
                
                <ListItemText 
                    primary={ title }
                    secondary={chat.members.length + 1 + " Members"}
                    primaryTypographyProps={classes.primaryText}
                    secondaryTypographyProps={classes.secondaryText}
                />
            </Box>
            <Box>
                    <MembersPopover />
                    <OptionsPopover />
            </Box>
        </>
    );
};

export default Header;
