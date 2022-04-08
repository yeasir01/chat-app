"use strict";

export default (sequelize, DataTypes) => {
    const Participant = sequelize.define("Participant",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            lastRead: {
                type: DataTypes.DATE,
                allowNull: false,
            }
        },
        {
            timestamps: true,
            tableName: "participants",
            paranoid: true,
        }
    );

    return Participant;
};
