"use strict";

import db from "../models/index.js";

export const getChats = async (req, res, next) => {
    try {
        const chats = await db.User.findAll({
            where: {
                id: 2
            },
            include: {
                model: db.Chat,
                include: db.User
            }
        });

        res.send(chats);
    } catch (err) {
        next(err);
    }
};
