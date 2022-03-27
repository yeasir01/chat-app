"use strict";

import bcrypt from "bcrypt";
import config from "../config/environment.js";

export default (sequelize, DataTypes) => {
    const User = sequelize.define("User",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            handle: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            emailVerified: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
        },
        {
            timestamps: true,
            tableName: "users",
        }
    );

    User.prototype.isPassword = async function (password) {
        return await bcrypt.compare(password, this.password);
    };

    User.addHook("beforeCreate", async function (user) {
        const hashedPassword = await bcrypt.hash(user.password, config.saltRounds);
        return (user.password = hashedPassword);
    });

    return User;
};
