import { verifyUser } from './authService';
import * as credentialRepository from '../repositories/credentialRepository';
import Cryptr from 'cryptr';
import { ICredentialData } from '../types/credentialTypes';

export async function createCredential(credentialData: ICredentialData) {
    const { userId, title, password } = credentialData;
    await verifyUser(userId);
    await verifyTitle(userId, title);

    const credentials = { ...credentialData, password: encryptPassword(password) };

    await credentialRepository.insert(credentials);

    return "Credential created";
}

async function verifyTitle (userId: number, title: string) {
    const result = await credentialRepository.findByTitleAndUserId(userId, title);
    if (result) throw { code: "conflict_error", message: "This title already exists" };
}

function encryptPassword (password: string) {
    const cryptr = new Cryptr(process.env.CRYPTR_SECRET || "");
    const encryptedPassword = cryptr.encrypt(password);

    return encryptedPassword;
}

export async function getCredentials(userId: number) {
    await verifyUser(userId);

    const credentials = await credentialRepository.find(userId);

    credentials.map(item => item.password = decryptPassword(item.password));

    return credentials;
}

function decryptPassword (password: string) {
    const cryptr = new Cryptr(process.env.CRYPTR_SECRET || "");
    const decryptedPassword = cryptr.decrypt(password);

    return decryptedPassword;
}

export async function getCredentialById(userId: number, credentialId: number) {
    await verifyUser(userId);

    const credential = await verifyCredentialAndUserId(userId, credentialId);

    return { ...credential, password: decryptPassword(credential.password)};
}

export async function deleteCredentialById(userId: number, credentialId: number) {
    await verifyUser(userId);

    await verifyCredentialAndUserId(userId, credentialId);
    
    await credentialRepository.deleteById(credentialId);

    return "Credential deleted";
}

async function verifyCredentialAndUserId(userId: number, credentialId: number) {
    const credential = await credentialRepository.findById(credentialId);

    if(!credential) throw { code: "notfound_error", message: "This credential doesn't exist" };

    if (credential.userId !== userId) throw { code: "unauthorized_error", message: "This credential doesn't belong to this user" };

    return credential;
}