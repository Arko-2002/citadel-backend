import jwt from 'jsonwebtoken';
import createError from '../utlis/createError.js';
export const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) return next(createError(401, 'You are not authenticated!'));

    jwt.verify(token, '123', async (err, payload) => {
        if (err) return next(createError(403, 'Token is not valid!'));
        req.userId = payload.id;
        next();
    });
};
