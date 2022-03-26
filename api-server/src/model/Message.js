import { db, DataTypes } from "../config/database.js";

const Message = db.define("message", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement: true
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    threadID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    }
},{
    timestamps: true,
    tableName: "message"
});

export default Message;
