"use strict";

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, _req, res, _next) => {
    const code = err.status || 500;
    const message = err.message || "server error";
    res.status(code).send(message);
};

export default errorHandler;