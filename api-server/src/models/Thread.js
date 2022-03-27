"use strict";

export default (sequelize, DataTypes) => {
    const Thread = sequelize.define("Thread",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            subject: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            timestamps: true,
            tableName: "threads",
        }
    );

    return Thread;
};
