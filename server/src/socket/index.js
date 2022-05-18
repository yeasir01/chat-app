"use strict";

import { saveMessageToDB } from "../service/message-service.js";

export const socketEventHandler = (io) => (
    io.on("connection", (socket) => {
        socket.username = socket.request.user.handle;
        console.log("user has connected");
        
        socket.on("chat:join", (chatId) => {
            console.log("a user joined a room");
            socket.room = chatId;
            socket.join(chatId);
        });

        socket.on("chat:leave", (cb) => {
            console.log("a user left a room");
            socket.leave(socket.room);
            cb();
        });

        socket.on("message:send", (message) => {
            console.log("a user sent a message", message);
            saveMessageToDB(message)
                .then( record => {
                    socket.to(socket.room).emit("message:receive", { ...message, id: record.id });
                })
                .catch( err => {
                    console.log(err);
                });
        });

        socket.on("disconnect", () => {
            console.log("a user disconnected");
        });
    })
);

export const wrap = (middleware) => {
    return (socket, next) => {
        return middleware(socket.request, {}, next);
    };
};
