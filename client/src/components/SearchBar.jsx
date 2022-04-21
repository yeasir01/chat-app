import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

const useStyles = () => ({
    textField: {
        width: 1,
        [`& fieldset`]: {
            borderRadius: 10,
        },
    },
});

const SearchBar = ({ placeHolder, value, handleChange }) => {
    const classes = useStyles();

    return (
        <>
            <TextField
                size="small"
                sx={classes.textField}
                placeholder={placeHolder || "search..."}
                value={value}
                onChange={handleChange}
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

export default SearchBar;
