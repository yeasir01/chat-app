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
            },
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: null,
            },
        },
        {
            timestamps: true,
            tableName: "participants",
        }
    );

    return Participant;
};
