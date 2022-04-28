"use strict";

const messageHandler = (io, socket) => {
    socket.on("message:create", (payload) => {
        console.log({payload});
    });
};

export default messageHandler;