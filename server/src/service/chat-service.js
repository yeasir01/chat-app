"use strict";

import db from "../models/index.js";
import { Op } from "sequelize";

const findAllChatByUserId = async (userId) => {
    
    const chats = await db.User.findAll({
        attributes: ["id", "handle"],
        where: {
            id: userId,
        },
        include: {
            model: db.Chat,
            attributes: ["id", "title", "avatar", "createdAt"],
            through: {
                attributes: [],
            },
            include: {
                model: db.User,
                where: {
                    [Op.not]: {
                        id: userId
                    }
                },
                attributes: ["id", "firstName", "lastName", "avatar", "isOnline", "handle"],
                through: {
                    attributes: [],
                }
            }
        },
    });

    return chats;
};

export { findAllChatByUserId };
