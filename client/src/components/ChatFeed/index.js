import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import useStore from "../../hooks/useStore.jsx";
import useFetch from "../../hooks/useFetch.jsx";
import SearchBar from "../common/SearchBar.jsx";
import LoaderBoundary from "../utility/LoaderBoundary.jsx";
import Header from "./Header.jsx";
import ChatList from "./ChatList.jsx";

const useStyles = () => ({
    root: {
        borderRadius: 2,
        overflow: "hidden",
        height: 1,
        boxShadow: "none"
    },
    conversationHeader: {
        padding: 2,
        paddingBottom: 0
    },
    search: {
        padding: 2
    },
});

const Main = () => {
    const setChats = useStore((state) => state.setChats);

    const { response, isLoading } = useFetch("/api/chats");

    const classes = useStyles();
    
    useEffect(() => {
        if (response.data?.chats) {
            setChats(response.data.chats)
        }
    },[response, setChats])

    return (
        <Paper elevation={1} sx={classes.root}>
            <Grid container direction="column" height={1}>
                <Grid item sx={classes.conversationHeader}>
                    <Header />
                </Grid>
                <Grid item sx={classes.search}>
                    <SearchBar placeHolder="find conversations" />
                </Grid>
                <Grid item>
                    <Divider />
                </Grid>
                <Grid item xs sx={{ overflowY: "auto" }}>
                    <LoaderBoundary loading={isLoading} message="loading chats...">
                        <ChatList />
                    </LoaderBoundary>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Main;
