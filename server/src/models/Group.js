"use strict";

export default (sequelize, DataTypes) => {
    const Group = sequelize.define("Group",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            isPublic: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        },
        {
            timestamps: true,
            tableName: "groups",
            paranoid: true,
        }
    );

    return Group;
};
