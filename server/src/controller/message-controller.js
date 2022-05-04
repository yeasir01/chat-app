"use strict";

import { findAllMessagesByChatId } from "../service/message-service.js";

export const getAllMessages = async (req, res, next) => {
    try {
        const chatId = req.query["chat-id"];
        const messages = await findAllMessagesByChatId(chatId);
        res.send(messages);
    } catch (err) {
        next(err);
    }
};
