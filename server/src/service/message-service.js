"use strict";

import db from "../models/index.js";

const findAllMessagesByChatId = async (chatId) => {
    const messages = await db.Message.findAll({
        attributes: ["id", "body", "createdAt"],
        where: {
            chatId: chatId
        },
        include: {
            model: db.User,
            attributes: ["id", "firstName", "lastName", "handle", "avatar"]
        },
        order: [["createdAt", "DESC"]]
    });

    return messages;
};

export { findAllMessagesByChatId };