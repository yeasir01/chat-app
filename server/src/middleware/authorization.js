"use strict";

const authorize = (req, res, next) => {

    if (req.isUnauthenticated()) {
        return res.status(403).json({message: "You dont have permission to access that resource!"});
    }

    next();
};

export default authorize;