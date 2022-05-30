import React, { useEffect } from "react";
import useSocket from "../hooks/useSocket.jsx";
import useStore from "../hooks/useStore.jsx";
import io from "socket.io-client";
import alert from "../assets/audio/sound-effect.mp3";
import SnackBar from "../components/common/SnackBar.jsx";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import Grid from "@mui/material/Grid";

const useStyles = () => ({
    root: {
        minHeight: "100vh",
        padding: 1.5,
        gap: 2,
    },
    chatList: {
        minWidth: 350,
    },
    chatFeed: {
        minWidth: 350,
        minHeight: 350,
    },
});

const ChatDashBoard = () => {
    // SOCKET STORE
    const socket = useSocket((state) => state.socket);
    const initSocket = useSocket((state) => state.initSocket);

    // GLOBAL STORE
    const openSnackbar = useStore((state) => state.openSnackbar);
    const setIsConnected = useStore((state) => state.setIsConnected);
    const addMessage = useStore((state) => state.addMessage);
    const activeChat = useStore((state) => state.activeChat);
    const updateMemberStatus = useStore(state=> state.updateMemberStatus);

    const classes = useStyles();

    useEffect(() => {
        if (!socket) {
            return initSocket(io("/", { reconnection: true }));
        }

        if (!socket.connected){
            socket.connect()
        }
        
        socket.on("connect", () => {
            setIsConnected(true);

            openSnackbar({
                message: "Ready to chatter!",
                duration: 3000,
                severity: "success",
            });
        });

        socket.on("disconnect", () => {
            setIsConnected(false);
            
            openSnackbar({
                message: "Socket Error: Disconnected",
                severity: "error",
            });
        });

        socket.on("message:receive", (message) => {
            addMessage(message);
            new Audio(alert).play();
        });

        socket.on("error:server", (message) => {
            console.error("Server Error:", message);
        });

        socket.on("user:connect", ({chatId, userId})=> {
            updateMemberStatus(chatId, userId, true)
        })

        socket.on("user:disconnect", ({chatId, userId})=> {
            updateMemberStatus(chatId, userId, false)
        })

        return () => {
            socket.removeAllListeners()
            socket.disconnect()
        };

    }, [addMessage, initSocket, openSnackbar, setIsConnected, socket, updateMemberStatus]);

    useEffect(()=>{
        if (!socket || !activeChat) return;
        socket.emit("chat:join", activeChat)
    },[activeChat, socket])

    return (    
            <Grid container sx={classes.root}>
                <Grid item>
                    <SnackBar />
                </Grid>
                <Grid item>
                    <SideBar />
                </Grid>
                <Outlet />
            </Grid>
    );
};

export default ChatDashBoard;
