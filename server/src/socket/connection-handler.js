"use strict";

const connectionHandler = (io, socket) => {
    const user = socket.request.user;
    socket.emit("new-user",`a user connected with ID# ${socket.id} - ${user.handle}`);
};

export default connectionHandler;
