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
            },
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: null,
            },
        },
        {
            timestamps: true,
            tableName: "messages",
        }
    );

    return Message;
};
