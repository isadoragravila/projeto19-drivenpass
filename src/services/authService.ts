import * as authRepository from '../repositories/authRepository';
import bcrypt from 'bcrypt';

export async function registerUser (email: string, password: string) {

    const existingEmail = await checkEmail(email);
    if (existingEmail) throw { code: "conflict_error", message: "This email is already registered in the database" };

    const encryptedPassword = encryptPassword(password);

    await authRepository.insert({ email, password: encryptedPassword });

    return "User successfully registered!"
}

async function checkEmail(email: string) {
    return await authRepository.findByEmail(email);
}

function encryptPassword(password: string) {
    const SALT = 10;
    return bcrypt.hashSync(password, SALT);
}