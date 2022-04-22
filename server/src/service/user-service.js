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

export { changeStatusToOnline };