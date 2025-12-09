import jwt from 'jsonwebtoken';
const config = process.env;
export const verifyToken = (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(403).send({ message: 'Token is required for authentication' });
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY || 'secret');
        req.user = decoded;
    }
    catch (err) {
        return res.status(401).send('Invalid Token');
    }
    return next();
};
