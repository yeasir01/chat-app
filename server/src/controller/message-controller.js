"use strict";

import { findAllMessagesByChatId, createChatMessage } from "../service/message-service.js";

export const getMessages = async (req, res, next) => {
    try {
        const { chatId } = req.query;
        const messages = await findAllMessagesByChatId(chatId);
        res.send(messages);
    } catch (err) {
        next(err);
    }
};

export const createMessage = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { chatId, message } = req.body;
        const msg = await createChatMessage(userId, chatId, message);
        res.send(msg);
    } catch (err) {
        next(err);
    }
};
