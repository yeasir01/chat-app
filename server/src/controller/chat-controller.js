"use strict";

import { findAllChatsByUserId } from "../service/chat-service.js";

export const getChats = async (req, res, next) => {
    try {
        const chats = await findAllChatsByUserId(req.user.id);
        res.status(200).json(chats);
    } catch (err) {
        next(err);
    }
};
