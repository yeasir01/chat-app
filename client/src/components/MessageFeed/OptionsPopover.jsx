import React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import IconButton from "@mui/material/IconButton";

const OptionsPopover = () => {
    const [anchor, setAnchor] = React.useState(null);

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
                <MoreVertOutlinedIcon />
            </IconButton>
            <Popover
                open={open}
                onClose={handleClose}
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
                <Typography sx={{ p: 2 }}>
                    The content of the Popover.
                </Typography>
            </Popover>
        </>
    );
};

export default OptionsPopover;
