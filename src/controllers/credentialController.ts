import { Request, Response } from 'express';
import * as credentialService from '../services/credentialService';

export async function createCredential(req: Request, res: Response) {
    const { id } = res.locals.responseJwt;
    const { title, url, username, password } = req.body;

    const result = await credentialService.createCredential(Number(id), title, url, username, password);

    return res.status(201).send(result);
}

export async function getCredentials(req: Request, res: Response) {
    const { id } = res.locals.responseJwt;

    const result = await credentialService.getCredentials(Number(id));

    return res.status(200).send(result);
}