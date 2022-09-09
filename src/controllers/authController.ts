import { Request, Response } from 'express';
import * as authService from '../services/authService';
import { IUserData } from '../types/authTypes';

export async function registerUser(req: Request, res: Response) {
    const { email, password } : IUserData = req.body;

    const result = await authService.registerUser(email, password);

    return res.status(201).send(result);
}

export async function loginUser(req: Request, res: Response) {
    const { email, password } : IUserData = req.body;

    const result = await authService.loginUser(email, password);

    return res.status(200).send(result);
}