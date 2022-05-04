"use strict";

import db from "../models/index.js";

const findAllMessagesByChatId = async (chatId) => {
    const messages = await db.Message.findAll({
        where: {
            chatId: chatId,
        },
        attributes: ["id", "text", "createdAt"],
        include: {
            model: db.User,
            attributes: ["id", "firstName", "lastName", "handle", "avatar"],
        },
        order: [["createdAt", "ASC"]],
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

        console.log(record)

        return record.get({ plain: true });
        
    } catch (error) {
        await transaction.rollback();
        console.error(error);
    }
};

export { findAllMessagesByChatId, saveMessageToDB };
