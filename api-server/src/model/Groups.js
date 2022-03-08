import { db, DataTypes } from "../config/database.js";

const Group = db.define("group", {
    group_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: true,
    tableName: "groups"
});

export default Group;