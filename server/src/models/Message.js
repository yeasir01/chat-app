"use strict";

export default (sequelize, DataTypes) => {
    const Message = sequelize.define("Message",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            body: {
                type: DataTypes.TEXT,
                allowNull: false,
            }
        },
        {
            timestamps: true,
            tableName: "messages",
            paranoid: true,
        }
    );

    return Message;
};
