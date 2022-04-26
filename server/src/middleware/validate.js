"use strict";

 const validate = (schema, params=false) => {
    return async (req, res, next) => {
        try {
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

export default validate;