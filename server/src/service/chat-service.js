"use strict";

import db from "../models/index.js";
import { Op } from "sequelize";

const findAllChatsByUserId = async (userId) => {
    const chats = await db.User.findAll({
        attributes: [],
        required: true,
        where: {
            id: userId,
        },
        include: {
            model: db.Chat,
            attributes: ["id", "title", "avatar", "isGroup" , "createdAt"],
            through: {
                attributes: [], // do not return anything from participants table
            },
            include: [
                {
                    model: db.User,
                    as: "members",
                    where: {
                        [Op.not]: { // do not return the requesting/logged in user
                            id: userId,
                        },
                    },
                    attributes: [ "id", "firstName", "lastName", "avatar", "isOnline", "handle" ],
                    through: {
                        attributes: [],
                    },
                },
                {
                    model: db.Message,
                    attributes: ["text", "createdAt", "userId", "chatId"],
                    order: [["createdAt", "DESC"]],
                    limit: 1, // Return last 25 messages
                    include: {
                        model: db.User,
                        attributes: ["id","firstName", "lastName", "handle"],
                    },
                },
            ],
        },
    });
    
    return chats[0];
};

export { findAllChatsByUserId };
