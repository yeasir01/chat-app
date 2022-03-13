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
                let validationErrors = {};

                for (let item of err.details) {
                    validationErrors[item.context.key] = item.message;
                }

                return res.status(422).json({validationErrors});
            }
            return res.status(422).json(err);
        }
    };
};