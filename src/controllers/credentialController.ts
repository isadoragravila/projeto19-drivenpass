import { Request, Response } from 'express';
import * as credentialService from '../services/credentialService';
import { ICredentialSchema } from '../types/credentialTypes';

export async function createCredential(req: Request, res: Response) {
    const userId = res.locals.id;
    const credential: ICredentialSchema = req.body;

    const result = await credentialService.createCredential({userId: Number(userId), ...credential});

    return res.status(201).send(result);
}

export async function getCredentials(req: Request, res: Response) {
    const userId = res.locals.id;

    const result = await credentialService.getCredentials(Number(userId));

    return res.status(200).send(result);
}

export async function getCredentialById(req: Request, res: Response) {
    const userId = res.locals.id;
    const { credentialId } = req.params;

    const result = await credentialService.getCredentialById(Number(userId), Number(credentialId));

    return res.status(200).send(result);
}

export async function deleteCredentialById(req: Request, res: Response) {
    const userId = res.locals.id;
    const { credentialId } = req.params;

    const result = await credentialService.deleteCredentialById(Number(userId), Number(credentialId));

    return res.status(200).send(result);
}