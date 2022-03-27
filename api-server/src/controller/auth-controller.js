"use strict";

import { User } from "../models/index.js";

export const register = async (req, res, next) => {
    try {
        await User.create(req.body);
        res.status(201).json({success: true}).end();
    } catch (err) {
        next(err);
    }
};

export const login = (req, res, next) => {
    try {
        const { email, handle, id } = req.user;
        res.status(200).json({user: {email, handle, id}}).end();
    } catch (err) {
        next(err);
    }
};

export const updateProfile = async (req, res, next) => {
    try {
        const user = await User.update(req.body ,{
            where: { id: req.user.id }, 
            returning: true
        });
        
        res.send(user[1]);

    } catch (err) {
        next(err);
    }
};

export const logout = (req, res, next) => {
    try {
        req.logout();
        res.status(200).clearCookie("connect.sid").end();
    } catch (err) {
        next(err);
    }
};