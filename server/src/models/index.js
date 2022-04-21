"use strict";

import Sequelize from "sequelize";
import config from "../config/environment.js";

// models import
import userSchema from "./User.js";
import messageSchema from "./Message.js";
import participantSchema from "./Participant.js";
import chatSchema from "./Chat.js";

const sequelize = new Sequelize(config.sequelize);

const db = {
    User: userSchema(sequelize, Sequelize.DataTypes),
    Message: messageSchema(sequelize, Sequelize.DataTypes),
    Participant: participantSchema(sequelize, Sequelize.DataTypes),
    Chat: chatSchema(sequelize, Sequelize.DataTypes),
};

Object.keys(db).forEach( modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;