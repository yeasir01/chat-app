import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import LoaderBoundary from "../utility/LoaderBoundary.jsx";
import useStore from "../../hooks/useStore.jsx";
import useFetch from "../../hooks/useFetch.jsx";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import Messages from "./Messages.jsx";

const useStyles = () => ({
    root: {
        height: 1,
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: "none",
    },
    headerGroup: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: 1,
        p: 2,
    },
});

const Main = () => {
    const setMessages = useStore((state) => state.setMessages);
    const activeChat = useStore((state) => state.activeChat);
    const chat = useStore((state) => state.getCurrentChat());

    const { response, isLoading, fetchRequest } = useFetch();

    const classes = useStyles();

    React.useEffect(() => {
        if (response.ok) {
            setMessages(response.data);
        }
    }, [response, setMessages]);

    React.useEffect(() => {
        if (activeChat !== null) {
            fetchRequest(`/api/messages?chat-id=${activeChat}`);
        }
    }, [activeChat, fetchRequest]);

    return (
        <Paper elevation={1} sx={classes.root}>
            <Grid container direction="column" height={1}>
                <LoaderBoundary loading={isLoading} message="...loading messages">
                    <Grid item sx={classes.headerGroup}>
                        <Header />
                    </Grid>
                    <Grid item>
                        <Divider />
                    </Grid>
                    <Grid item xs padding={5} sx={{ overflowY: "auto" }}>
                        <Messages />
                    </Grid>
                    <Grid item>
                        <Divider />
                    </Grid>
                    <Grid item>
                        <Footer />
                    </Grid>
                </LoaderBoundary>
            </Grid>
        </Paper>
    );
};

export default Main;
