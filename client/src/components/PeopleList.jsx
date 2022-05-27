import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import SearchBar from "./common/SearchBar";
import LoaderBoundary from "./utility/LoaderBoundary.jsx";

const useStyles = () => ({
    root: {
        borderRadius: 2,
        overflow: "hidden",
        height: 1,
    },
    search: {
        padding: 2,
    },
    primaryText: {
        color: "text.primary",
    },
    secondaryText: {
        color: "text.secondary",
    },
});

const PeopleList = (props) => {
    const classes = useStyles();
    
    return (
        <Paper elevation={1} sx={classes.root}>
            <Grid container direction="column" height={1}>
                <Grid item sx={classes.search}>
                    <SearchBar placeHolder="find people" />
                </Grid>
                <Grid item>
                    <Divider />
                </Grid>
                <Grid item xs sx={{ overflowY: "auto" }}>
                    <LoaderBoundary loading={props.isLoading}>
                        <List disablePadding>
                          Hello
                        </List>
                    </LoaderBoundary>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default PeopleList;
