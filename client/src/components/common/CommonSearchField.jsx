import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

const useStyles = () => ({
    textField: {
        width: 1,
    },
});

const CommonSearchField = ({sx, placeHolder, ...rest}) => {

    const classes = useStyles();

    return (
        <>
            <TextField
                size="small"
                variant="outlined"
                sx={{...classes.textField, ...sx}}
                placeholder={placeHolder || "search..."}
                {...rest}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </>
    );
};

export default CommonSearchField;
