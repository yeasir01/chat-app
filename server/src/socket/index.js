"use strict";

import { saveMessageToDB } from "../service/message-service.js";

export const socketEventHandler = (io) => (
    io.on("connection", (socket) => {
        socket.username = socket.request.user.handle;
        
        socket.on("chat:join", (chatId) => {
            socket.room = chatId;
            socket.join(chatId);
        });

        socket.on("chat:leave", (cb) => {
            socket.leave(socket.room);
            cb();
        });

        socket.on("message:send", (message) => {
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
