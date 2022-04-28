"use strict";

import db from "../models/index.js";

const findAllMessagesByChatId = async (chatId) => {
    const messages = await db.Message.findAll({
        where: {
            chatId: chatId,
        },
        attributes: ["id", "body", "createdAt"],
        include: {
            model: db.User,
            attributes: ["id", "firstName", "lastName", "handle", "avatar"],
        },
        order: [["createdAt", "ASC"]],
    });
    return messages;
};

const createChatMessage = async (userId, chatId, message) => {
    const transaction = await db.sequelize.transaction();
    
    try { 
        const record = await db.Message.create({
            body: message,
            chatId,
            userId
        }, {
            transaction
        });
        
        await transaction.commit();
        
        const data = await db.Message.findOne({
            where: {
                id: record.id
            },
            attributes: ["id", "body", "createdAt"],
            include: {
                model: db.User,
                attributes: ["id", "firstName", "lastName", "handle", "avatar"]
            }
        });
        
        return data;
        
    } catch (error) {
        await transaction.rollback();
        console.log(error);
    }
};

export { findAllMessagesByChatId, createChatMessage };
