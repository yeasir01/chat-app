"use strict";

export default (sequelize, DataTypes) => {
    const Message = sequelize.define("message",
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

    Message.associate = ({User, Chat}) => {
        Message.belongsTo(User);
        Message.belongsTo(Chat);
    };

    return Message;
};
