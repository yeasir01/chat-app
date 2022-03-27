"use strict";

import Sequelize from "sequelize";
import config from "../config/environment.js";
import userSchema from "./User.js";
import messageSchema from "./Message.js";
import participantSchema from "./Participant.js";
import threadSchema from "./Thread.js";

const sequelize = new Sequelize(config.sequelize);

const User = userSchema(sequelize, Sequelize.DataTypes);
const Message = messageSchema(sequelize, Sequelize.DataTypes);
const Participant = participantSchema(sequelize, Sequelize.DataTypes);
const Thread = threadSchema(sequelize, Sequelize.DataTypes);

User.hasMany(Participant, {
    foreignKey: "userID"
});

User.hasMany(Message, {
    foreignKey: "userID"
});

Thread.hasMany(Message,{
    foreignKey: "threadID"
});

Thread.hasMany(Participant,{
    foreignKey: "threadID"
});

export {
    sequelize,
    Sequelize,
    User,
    Message,
    Participant,
    Thread
};