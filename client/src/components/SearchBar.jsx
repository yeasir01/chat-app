import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

const useStyles = ()=>({
    textField: {
        width:1,
    }
})

const SearchBar = () => {

    const classes = useStyles();

    return (
        <>
            <TextField
                size="small"
                sx={classes.textField}
                placeholder="search..."
                InputProps={{
                    startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                }}
            />
        </>
    );
};

export default SearchBar;
