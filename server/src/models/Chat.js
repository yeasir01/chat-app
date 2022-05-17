"use strict";

export default (sequelize, DataTypes) => {
    const Chat = sequelize.define("chat",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            avatar: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            isPublic: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            isGroup: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
        },
        {
            timestamps: true,
            tableName: "chats",
            paranoid: true,
        }
    );
    
    Chat.associate = ({User, Message, Participant}) => {
        Chat.belongsToMany(User, {
            through: Participant,
            as: "members"
        });
        
        Chat.hasMany(Message);
    };

    return Chat;
};
