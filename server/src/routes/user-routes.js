"use strict";

import express from "express";
import { login, register, updateProfile, logout, getProfile } from "../controller/user-controller.js";
import { validate } from "../middleware/validate.js";
import checkAuth from "../middleware/authorization.js";
import passport from "../config/passport.js";

const auth = express.Router();

auth.route("/login")
    // @route  GET /auth/login
    // @desc   GET - check credentials and return a session cookie if auth passes.
    // @access Public
    .post(validate("login"), passport.authenticate("local"), login);

auth.route("/authenticate")
    // @route  GET /auth/authenticate
    // @desc   GET - check cookie and return user object.
    // @access Private
    .get(checkAuth, getProfile);

auth.route("/register")
    // @route  GET /auth/register
    // @desc   GET - insert a new user into the database
    // @access Public
    .post(validate("register"), register);

auth.route("/profile")
    // @route  PUT /auth/register
    // @desc   PUT - update a users profile data.
    // @access Private
    .put(validate("profile"), checkAuth, updateProfile);

auth.route("/logout")
    // @route  DELETE /auth/logout
    // @desc   DELETE - destroys the current session.
    // @access Private
    .delete(checkAuth, logout);

export default auth;