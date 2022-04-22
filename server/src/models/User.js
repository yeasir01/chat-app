"use strict";

import bcrypt from "bcrypt";
import config from "../config/environment.js";

export default (sequelize, DataTypes) => {
    const User = sequelize.define("user",
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
            avatar: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            emailVerified: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            isOnline: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            timestamps: true,
            tableName: "users",
        }
    );

    User.associate = ({Chat, Message, Participant}) => {
        User.belongsToMany(Chat, {
            through: Participant
        });
        User.hasMany(Message);
    };

    User.prototype.isPassword = async function (password) {
        return await bcrypt.compare(password, this.password);
    };

    User.addHook("beforeCreate", async function (user) {
        const hashedPassword = await bcrypt.hash(user.password, config.saltRounds);
        user.password = hashedPassword;
    });

    User.addHook("beforeUpdate", async function (user) {
        if (user.changed("password")) {
            const hashedPassword = await bcrypt.hash(user.password, config.saltRounds);
            user.password = hashedPassword;
        }
    });

    return User;
};
