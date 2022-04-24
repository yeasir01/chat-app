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
                attributes: [],
            },
            include: [
                {
                    model: db.User,
                    where: {
                        [Op.not]: {
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
                    attributes: ["body", "updatedAt", "userId"],
                    order: [["updatedAt", "DESC"]],
                    limit: 1,
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
