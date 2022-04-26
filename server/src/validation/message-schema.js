import Joi from "joi";

const createMessage = Joi.object({
    message: Joi.string().required(),
    chatId: Joi.number().required(),
});

export default {
    createMessage
};