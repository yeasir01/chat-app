"use strict";

import express from "express";
import { register, login } from "../../controller/auth-controller.js";

const router = express.Router();

router.route("/login")
    // @route  GET /api/auth/login
    // @desc   GET Check credentials and returns a cookie
    // @access Public
    .get(login);

router.route("/register")
    // @route  GET /api/auth/register
    // @desc   GET Insert a new user into data base
    // @access Public
    .get(register);

export default router;