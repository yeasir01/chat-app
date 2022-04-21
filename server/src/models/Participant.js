"use strict";

export default (sequelize, DataTypes) => {
    const Participant = sequelize.define("participant",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
        },
        {
            timestamps: true,
            tableName: "participants",
            paranoid: true,
        }
    );

    Participant.associate = ({User, Chat}) => {
        Participant.belongsTo(User);
        Participant.belongsTo(Chat);
    };

    return Participant;
};
