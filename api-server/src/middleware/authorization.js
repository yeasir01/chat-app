"use strict";

const authorize = (req, res, next) => {

    if (!req.isAuthenticated()) {
        return res.status(403).json({message: "You dont have permission to access this resource"});
    }

    next();
};

export default authorize;