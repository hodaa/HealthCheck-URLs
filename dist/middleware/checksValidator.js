export const validateChecks = (req, res, next) => {
    const url = req.body.url;
    if (!url) {
        return res.status(422).send({ message: 'URL is required' });
    }
    return next();
};
