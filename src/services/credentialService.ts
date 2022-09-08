import * as authRepository from '../repositories/authRepository';
import * as credentialRepository from '../repositories/credentialRepository';
import Cryptr from 'cryptr';

export async function createCredential(id: number, title: string, url: string, username: string, password: string) {
    await verifyUser(id);
    await verifyTitle(id, title);

    const credential = { title, url, username, password: encryptPassword(password), userId: id};

    await credentialRepository.insert(credential);

    return "Credential created";
}

async function verifyUser (id: number) {
    const user = await authRepository.findTokenMatch(id);
    if (!user) throw { code: "notfound_error", message: "User not found" };
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