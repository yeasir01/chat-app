export const validate = (schema, reqType="body") => {
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req[reqType]);
            next();
        } catch (err) {
            return res.status(422).json(err?.details);
        }
    };
};