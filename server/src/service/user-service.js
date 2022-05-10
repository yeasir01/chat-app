"use strict";

import db from "../models/index.js";

const changeStatusToOnline = async (userId) => {
    await db.User.update({
        isOnline: true
    },{
        where: {
            id: userId
        }
    });
};
const changeStatusToOffline = async (userId) => {
    await db.User.update({
        isOnline: false
    },{
        where: {
            id: userId
        }
    });
};

export { changeStatusToOnline, changeStatusToOffline };