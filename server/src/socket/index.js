"use strict";

import chatsHandler from "./chat-handler.js";
import connectionHandler from "./connection-handler.js";
import messageHandler from "./message-handler.js";

export const socketEventHandler = (io) => {
    
    const registerHandlers = (socket) => {
        connectionHandler(io, socket);
        chatsHandler(io, socket);
        messageHandler(io, socket);
    };

    io.on("connection", registerHandlers);
};

export const wrap = (middleware) => {
    return (socket, next) => {
        return middleware(socket.request, {}, next);
    };
};
