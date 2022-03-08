"use strict";

import schemaList from "../validation/schema.js";

export const validate = (schemaName = "", params=false) => {
    return async (req, res, next) => {
        try {
            const schema = schemaList[schemaName];
            const reqType = req[params ? "params" : "body"];
            await schema.validateAsync(reqType, { abortEarly: false });
            next();
        } catch (err) {
            if (err.details) {
                const errors = err.details.map(e => {
                    return {
                        message: e.message, 
                        key: e.context.key
                    };
                });
                return res.status(422).json(errors);
            }
            return res.status(422).json(err);
        }
    };
};