import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

async function validateToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    const secretKey = process.env.JWT_SECRET || "";

    if (!token) throw { code: "unauthorized_error", message: "Invalid token" };

    try {
        jwt.verify(token, secretKey);
    } catch (error) {
        return res.status(401).send('Invalid token');
    }

    const responseJwt = jwt.verify(token, secretKey);

    res.locals.responseJwt = responseJwt;
    
    next();
}

export default validateToken;