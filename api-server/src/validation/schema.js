"use strict";

import Joi from "joi";
import { User } from "../models/index.js";

const uniqueEmail = async (email) => {
    const account = await User.findOne({
        where: {email},
    });

    if (account) {
        throw {
            details: [
                {
                    message: "That email already exists",
                    path: ["email"],
                    type: "any.external",
                    context: { label: "email", key: "email" },
                },
            ],
        };
    }
};

const uniqueHandle = async (handle) => {
    const account = await User.findOne({
        where: { handle },
    });

    if (account) {
        throw {
            details: [
                {
                    message: "That handle already exists",
                    path: ["handle"],
                    type: "any.external",
                    context: { label: "handle", key: "handle" },
                },
            ],
        };
    }
};

const common = {
    firstName: Joi.string().min(3).max(50),
    lastName: Joi.string().min(3).max(50),
    email: Joi.string().email().message("Invalid email format"),
    handle: Joi.string(),
    password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{8,40}$"))
        .message("Password must 8-40 characters long"),
    image: Joi.string().uri(),
    remember: Joi.boolean(),
};

const register = Joi.object({
    firstName: common.firstName.required(),
    lastName: common.lastName.required(),
    email: common.email.required().external(uniqueEmail),
    handle: common.handle.required().external(uniqueHandle),
    password: common.password.required(),
    passwordRepeat: Joi.ref("password"),
});

const login = Joi.object({
    email: common.email.required(),
    password: common.password.required(),
    remember: common.remember.required(),
});

const profile = Joi.object({
    firstName: common.firstName,
    lastName: common.lastName,
    email: common.email,
    image: common.image,
});

export default {
    register,
    login,
    profile,
};
