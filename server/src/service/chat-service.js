"use strict";

import db from "../models/index.js";
import { Op } from "sequelize";

const findAllChatsByUserId = async (userId) => {
    const query = await db.User.findAll({
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
                    limit: 1,
                    include: {
                        model: db.User,
                        attributes: ["id","firstName", "lastName", "handle"],
                    },
                },
            ],
        },
    });
    
    return query[0];
};

const getAllChatIds = async (userId) => {
    const query = await db.User.findAll({
        attributes: [],
        required: true,
        plain: true,
        where: {
            id: userId,
        },
        include: {
            model: db.Chat,
            attributes: ["id"],
            through: {
                attributes: [], // do not return anything from participants table
            },
        },
    });
    
    return query.chats.map(obj => obj.id);
};

export { findAllChatsByUserId, getAllChatIds };
