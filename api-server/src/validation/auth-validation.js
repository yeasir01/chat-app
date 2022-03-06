import Joi from "joi";

export const registerSchema = Joi.object({
    firstName: Joi.string()
        .min(3)
        .max(50)
        .required(),
    lastName: Joi.string()
        .min(3)
        .max(50)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
    handle: Joi.string(),
    password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{8,40}$"))
        .required(),
    passwordRepeat: Joi.ref("password")
});

export const loginSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
    password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{8,40}$"))
        .required()
});