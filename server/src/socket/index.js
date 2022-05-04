"use strict";

import { saveMessageToDB } from "../service/message-service.js";

export const socketEventHandler = (io) => {
    return io.on("connection", (socket) => {

        socket.on("chat:join", (chatId) => {
            socket.join(chatId);
        });

        socket.on("chat:active", (chatId) => {
            socket.activeChat = chatId;
        });

        socket.on("message:create", (message) => {
            const activeChat = socket.activeChat;
            //const user = socket.request.user;
            
            saveMessageToDB(message)
                .then((res) => {
                    console.log("response", res);
                    console.log("message Obj", message);
                    socket.to(activeChat).emit("message:receive", message);
                })
                .catch((err) => {
                    console.log(err);
                });
        });

        socket.on("disconnect", () => {
            console.log("a user disconnected!");
        });
    });
};

export const wrap = (middleware) => {
    return (socket, next) => {
        return middleware(socket.request, {}, next);
    };
};
