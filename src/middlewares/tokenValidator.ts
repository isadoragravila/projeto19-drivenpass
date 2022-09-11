import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

interface IJwtPayload {
    id: number
}

async function validateToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    const SECRET = process.env.JWT_SECRET || "";

    if (!token) throw { code: "unauthorized_error", message: "Invalid token" };

    try {
        const { id } = jwt.verify(token, SECRET) as IJwtPayload;

        res.locals.id = id;

        next();

    } catch (error) {
        return res.status(401).send('Invalid token');
    }
}

export default validateToken;