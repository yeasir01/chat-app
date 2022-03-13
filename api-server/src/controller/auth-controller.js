"use strict";

import User from "../model/User.js";
import { Sequelize } from "sequelize";

export const register = async (req, res, next) => {
    try {
        const { email, handle } = req.body;
        
        const user = await User.findOne({
            where: Sequelize.or({ handle }, { email })
        });

        let errors = [];
        
        if (!user) {
            const new_record = await User.create(req.body);
            return res.status(200).json({message: "Welcome! activate account to login", user: new_record});
        }
        
        if (user.handle === handle) {
            errors.push({ message: "That handle is already in use", key: "handle" });
        }
        
        if (user.email === email) {
            errors.push({ message: "That email is already in use.", key: "email" });
        }
        
        res.status(422).json(errors);
        
    } catch (err) {
        next(err);
    }
};

export const login = (req, res, next) => {
    try {
        res.status(200).json(req.user).end();
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