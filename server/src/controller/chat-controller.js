"use strict";

import { findAllChatsByUserId } from "../service/chat-service.js";

export const getChats = async (req, res, next) => {
    try {
        const chats = await findAllChatsByUserId(req.user.id);
        res.send(chats);
    } catch (err) {
        next(err);
    }
};
