"use strict";

import { saveMessageToDB } from "../service/message-service.js";
import { getAllChatIds } from "../service/chat-service.js";

export const socketEventHandler = (io) =>
    io.on("connection", (socket) => {
        socket.username = socket.request.user.handle;
        console.log(socket.username, "has connected");
        getAllChatIds(socket.request.user.id)
            .then((groups) => {
                socket.join(groups);
            })
            .catch((err) => {
                socket.emit("error:join", "Unable to join groups");
                console.log(err);
            });

        socket.on("chat:join", (chatId) => {
            socket.room = chatId;
            console.log("Joined Rooms", socket.rooms);
        });

        socket.on("message:send", (message) => {
            saveMessageToDB(message)
                .then((record) => {
                    socket.to(socket.room).emit("message:receive", { ...message, id: record.id });
                })
                .catch((err) => {
                    console.log(err);
                });
        });

        socket.on("disconnect", () => {
            console.log("a user disconnected");
        });
    });

export const wrap = (middleware) => {
    return (socket, next) => {
        return middleware(socket.request, {}, next);
    };
};
