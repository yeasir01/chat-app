"use strict";

import { findAllChatsByUserId } from "../service/chat-service.js";

export const getChats = async (req, res, next) => {
    try {
        const loggedInUserId = req.user.id;
        const chats = await findAllChatsByUserId(loggedInUserId);
        res.status(200).json(chats);
    } catch (err) {
        next(err);
    }
};
