"use strict";

import express from "express";
import { login, register, updateProfile, logout } from "../controller/auth-controller.js";
import { validate } from "../middleware/validate.js";
import checkAuth from "../middleware/authorization.js";
import passport from "../config/passport.js";

const router = express.Router();

router.route("/login")
    // @route  GET /auth/login
    // @desc   GET - check credentials and return a session cookie if auth passes.
    // @access Public
    .get(validate("login"), passport.authenticate("local"), login);

router.route("/register")
    // @route  GET /auth/register
    // @desc   GET - insert a new user into the database
    // @access Public
    .post(validate("register"), register);

router.route("/profile")
    // @route  PUT /auth/register
    // @desc   PUT - update a users profile data.
    // @access Private
    .put(validate("profile"), checkAuth, updateProfile);

router.route("/logout")
    // @route  DELETE /auth/logout
    // @desc   DELETE - destroys the current session.
    // @access Private
    .delete(checkAuth, logout);

export default router;