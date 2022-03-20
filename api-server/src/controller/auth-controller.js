"use strict";

import User from "../model/User.js";
import { Sequelize } from "sequelize";

export const register = async (req, res, next) => {
    try {
        const { email, handle } = req.body;
        
        const user = await User.findOne({
            where: Sequelize.or({ handle }, { email })
        });

        if (!user) {
            await User.create(req.body);
            return res.status(201).end();
        }
        
        let validationErrors = {};
        
        if (user.handle === handle) {
            validationErrors["handle"] = "That handle already exists, please try another.";
        }
        
        if (user.email === email) {
            validationErrors["email"] = "That email already exists, please try another.";
        }
        
        res.status(422).json({validationErrors});
        
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