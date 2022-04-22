"use strict";

import { findAllChatByUserId } from "../service/chat-service.js";

export const getChats = async (req, res, next) => {
    try {
        const chats = await findAllChatByUserId(req.user.id);
        res.send(chats);
    } catch (err) {
        next(err);
    }
};
