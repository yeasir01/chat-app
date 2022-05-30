"use strict";

import { saveMessageToDB } from "../service/message-service.js";
import { getAllChatIds } from "../service/chat-service.js";
import { changeStatusToOnline, changeStatusToOffline } from "../service/user-service.js";

export const socketEventHandler = (io) =>
    io.on("connection", (socket) => {
        socket.user = socket.request.user;

        (async (userId) => {
            try {
                const chatRoomIds = await getAllChatIds(userId);
                socket.join(chatRoomIds);

                await changeStatusToOnline(userId);

                socket.rooms.forEach((room) => {
                    if (room === socket.id) {
                        return;
                    }
                    socket.to(room).emit("user:connect", {
                        chatId: room,
                        userId: socket.user.id,
                    });
                });
            } catch (err) {
                socket.emit("error:server", "issue trying to join rooms");
                console.log(err);
            }
        })(socket.user.id);

        socket.on("chat:join", (chatId) => {
            socket.room = chatId;
            console.log("Joined Rooms", socket.rooms, socket.id);
        });

        socket.on("message:send", (message) => {
            saveMessageToDB(message)
                .then((record) => {
                    socket
                        .to(socket.room)
                        .emit("message:receive", { ...message, id: record.id });
                })
                .catch((err) => {
                    console.log(err);
                });
        });

        socket.on("disconnecting", async () => {
            try {
                socket.rooms.forEach((room) => {
                    if (room === socket.id) {
                        return;
                    }
                    socket.to(room).emit("user:disconnect", {
                        chatId: room,
                        userId: socket.user.id,
                    });
                });

                await changeStatusToOffline(socket.user.id);
            } catch (err) {
                socket.emit("error:server", "an issue occurred while disconnecting");
                console.log(err);
            }
        });
    });

export const wrap = (middleware) => {
    return (socket, next) => {
        return middleware(socket.request, {}, next);
    };
};
