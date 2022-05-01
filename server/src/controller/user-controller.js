"use strict";

import db from "../models/index.js";

export const register = async (req, res, next) => {
    try {
        await db.User.create(req.body);
        res.status(201).json({ success: true });
    } catch (err) {
        next(err);
    }
};

export const login = (req, res, next) => {
    try {
        const { email, handle, id, firstName, lastName, avatar } = req.user;
        res.status(200).json({ user: { email, handle, id, firstName, lastName, avatar } });
    } catch (err) {
        next(err);
    }
};

export const getProfile = (req, res, next) => {
    try {
        const { email, handle, id, firstName, lastName, avatar } = req.user;
        res.status(200).json({ user: { email, handle, id, firstName, lastName, avatar } });
    } catch (err) {
        next(err);
    }
};

export const updateProfile = async (req, res, next) => {
    try {
        const user = await db.User.update(req.body, {
            where: { id: req.user.id },
            returning: true,
        });

        res.status(200).send(user[0]);
    } catch (err) {
        next(err);
    }
};

export const logout = (req, res, next) => {
    try {
        req.logout();
        res.status(204).clearCookie("connect.sid").end();
    } catch (err) {
        next(err);
    }
};
