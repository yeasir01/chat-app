import { useEffect, createContext, useState } from "react";
import SideBar from "../components/SideBar.jsx";
import Grid from "@mui/material/Grid";
import { Outlet } from "react-router-dom";
import SnackBar from "../components/SnackBar.jsx";
import { useStore, types } from "../hooks/useStore.jsx";
import io from "socket.io-client";

const useStyles = () => ({
    root: {
        height: "100vh",
        padding: 2,
        gap: 2,
    },
    side: {
        background: "primary.main",
    },
    chatList: {
        minWidth: 350,
    },
    chatFeed: {
        minWidth: 350,
        minHeight: 350,
    },
});

export const SocketContext = createContext();

const AppLayout = () => {
    const [socket, setSocket] = useState(null);
    
    const dispatch = useStore((state) => state.dispatch);
    const activeChatId = useStore((state) => state.activeChatId);
    
    const classes = useStyles();

    useEffect(() => {
        if (!socket) {
            return setSocket(io("/"));
        }
        
        socket.on("connect", () => {
            dispatch({ 
                type: types.SET_CONNECTED, 
                payload: true 
            });

            dispatch({
                type: types.OPEN_SNACKBAR,
                payload: {
                    message: "Ready to chatter!",
                    duration: 3000,
                    severity: "success"
                },
            });
        });

        socket.on("disconnect", () => {
            dispatch({ 
                type: types.SET_CONNECTED, 
                payload: false 
            });

            dispatch({
                type: types.OPEN_SNACKBAR,
                payload: {
                    message: "Socket Error: Disconnected",
                    severity: "error",
                },
            });
        });

        socket.on("message:receive", (message) => {
            dispatch({
                type: types.ADD_MESSAGE, 
                payload: message
            })
        });

        return () => {
            socket.disconnect();
        };
    }, [dispatch, socket]);

    useEffect(()=>{
        if (!socket || !activeChatId) return;
        socket.emit("chat:join", activeChatId)
    },[activeChatId, socket])

    return (
        <SocketContext.Provider value={socket}>
            <Grid container sx={classes.root}>
                <Grid item>
                    <SnackBar/>
                </Grid>
                <Grid item>
                    <SideBar />
                </Grid>
                <Outlet/>
            </Grid>
        </SocketContext.Provider>
    );
};

export default AppLayout;
