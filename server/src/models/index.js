"use strict";

import Sequelize from "sequelize";
import config from "../config/environment.js";
import userSchema from "./User.js";
import messageSchema from "./Message.js";
import participantSchema from "./Participant.js";
import groupSchema from "./Group.js";

const sequelize = new Sequelize(config.sequelize);

const User = userSchema(sequelize, Sequelize.DataTypes);
const Message = messageSchema(sequelize, Sequelize.DataTypes);
const Participant = participantSchema(sequelize, Sequelize.DataTypes);
const Group = groupSchema(sequelize, Sequelize.DataTypes);

User.hasMany(Message, {
    foreignKey: "userID"
});

User.hasMany(Participant, {
    foreignKey: "userID"
});

User.hasMany(Group, {
    foreignKey: "ownerID"
});

Group.hasMany(Participant,{
    foreignKey: "groupID"
});

Group.hasMany(Message, {
    foreignKey: "groupID"
});

export {
    sequelize,
    Sequelize,
    User,
    Message,
    Participant,
    Group
};