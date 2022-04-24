"use strict";

import { findAllMessagesByChatId } from "../service/message-service.js";

export const getMessages = async (req, res, next) => {
    try {
        const { chatId } = req.query;
        const messages = await findAllMessagesByChatId(chatId);
        res.send(messages);
    } catch (err) {
        next(err);
    }
};
