"use strict";

import db from "../models/index.js";

const findAllMessagesByChatId = async (chatId) => {
    const messages = await db.Message.findAll({
        where: {
            chatId: chatId,
        },
        attributes: ["id", "text", "createdAt", "chatId"],
        include: {
            model: db.User,
            attributes: ["id", "firstName", "lastName", "handle", "avatar"],
        },
        order: [["createdAt", "DESC"]],
    });
    return messages;
};

const saveMessageToDB = async (msg) => {
    const transaction = await db.sequelize.transaction();
    
    try { 
        const record = await db.Message.create({
            text: msg.text,
            chatId: msg.chatId,
            userId: msg.user.id,
        }, {
            transaction
        });
        
        await transaction.commit();

        const obj = record.get({ plain: true });

        return obj;
        
    } catch (error) {
        await transaction.rollback();
        console.error(error);
    }
};

export { findAllMessagesByChatId, saveMessageToDB };
