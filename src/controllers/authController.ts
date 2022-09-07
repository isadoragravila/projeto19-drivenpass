import { Request, Response } from 'express';
import * as authService from '../services/authService';

export async function registerUser(req: Request, res: Response) {
    const { email, password } = req.body;

    const result = await authService.registerUser(email, password);

    return res.status(201).send(result);
}