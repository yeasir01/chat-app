import config from "../config/env.js";
import bcrypt from "bcrypt";
import User from "../model/User.js";
import { Sequelize } from "sequelize";

export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, handle } = req.body;
    
        const user = await User.findOne({
            where: Sequelize.or({ handle }, { email }),
        });
    
        if (user) {
            return res.send("That user already is here");
        }
        
        const hash = await bcrypt.hash(password, config.saltRounds);
    
        const new_record = await User.create({
            first_name: firstName,
            last_name: lastName,
            email: email,
            hash: hash,
            handle: handle,
        });
    
        res.send(new_record);
    } catch (error) {
        res.send(error);
    }
};

export const login = async (req, res) => {
    console.log("hello World");
};