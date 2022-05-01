"use strict";

export const socketEventHandler = (io) => {
    return io.on("connection", (socket) => {
        let room = null;

        socket.on("chat:join", (chatId) => {
            if (!chatId) return;
            socket.join(chatId);
            room = chatId;
        });

        socket.on("message:create", (payload) => {
            if (!payload.chatId) return;
            socket.to(room).emit("message:receive", payload);
        });

        socket.on("disconnect", ()=>{
            console.log("a user disconnected!");
        });
    });
};

export const wrap = (middleware) => {
    return (socket, next) => {
        return middleware(socket.request, {}, next);
    };
};
