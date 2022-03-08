"use strict";

import Joi from "joi";

const setup = {
    firstName: Joi.string()
        .min(3)
        .max(50),
    lastName: Joi.string()
        .min(3)
        .max(50),
    email: Joi.string()
        .email(),
    handle: Joi.string(),
    password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{8,40}$")),
    image: Joi.string()
        .uri()
};

const register = Joi.object({
    firstName: setup.firstName.required(),
    lastName: setup.lastName.required(),
    email: setup.email.required(),
    handle: setup.handle.required(),
    password: setup.password.required(),
    passwordRepeat: Joi.ref("password")
});

const login = Joi.object({
    email: setup.email.required(),
    password: setup.password.required()
});

const profile = Joi.object({
    firstName: setup.firstName,
    lastName: setup.lastName,
    email: setup.email,
    handle: setup.handle,
    password: setup.password,
    image: setup.image
});

export default {
    register,
    login,
    profile
};