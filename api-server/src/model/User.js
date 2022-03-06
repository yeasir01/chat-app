import { db, DataTypes } from "../config/database.js";

const User = db.define("user", {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    handle: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    hash: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: true
});

export default User;