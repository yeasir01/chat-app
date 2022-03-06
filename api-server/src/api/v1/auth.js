"use strict";

import express from "express";
import { register, login } from "../../controller/auth-controller.js";
import { validate } from "../../middleware/validate.js";
import { loginSchema, registerSchema } from "../../validation/auth-validation.js";

const router = express.Router();

router.route("/login")
    // @route  GET /v1/auth/login
    // @desc   GET Check credentials and returns a cookie
    // @access Public
    .get(validate(loginSchema, "body"), login);

router.route("/register")
    // @route  GET /v1/auth/register
    // @desc   GET Insert a new user into data base
    // @access Public
    .post(validate(registerSchema, "body"), register);

export default router;