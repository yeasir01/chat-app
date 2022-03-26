import { db, DataTypes } from "../config/database.js";

const Thread = db.define("thread", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement: true
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
},{
    timestamps: true,
    tableName: "thread"
});

export default Thread;