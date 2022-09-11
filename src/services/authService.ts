import * as authRepository from '../repositories/authRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function registerUser(email: string, password: string) {
    const existingEmail = await checkEmail(email);
    if (existingEmail) throw { code: "conflict_error", message: "This email is already registered in the database" };

    const encryptedPassword = encryptPassword(password);

    await authRepository.insert({ email, password: encryptedPassword });

    return "User successfully registered!"
}

export async function loginUser(email: string, password: string) {
    const user = await checkEmailAndPassword(email, password);
    
    const token = generateToken(user.id);

    return { token };
}

async function checkEmail(email: string) {
    return await authRepository.findByEmail(email);
}

function encryptPassword(password: string) {
    const SALT = 10;
    return bcrypt.hashSync(password, SALT);
}

async function checkEmailAndPassword(email: string, password: string) {
    const user = await checkEmail(email);
    if (!user) throw { code: "unauthorized_error", message: "Wrong email or password" };

    const encryptedPassword = user.password;

    if (!bcrypt.compareSync(password, encryptedPassword)) throw { code: "unauthorized_error", message: "Wrong email or password" };

    return user;
}

function generateToken(id: number) {
    const data = { id };
    const SECRET = process.env.JWT_SECRET || "";
    const EXPIRES_IN = Number(process.env.TOKEN_EXPIRES_IN);
    const options = { expiresIn: EXPIRES_IN };
    
    return jwt.sign(data, SECRET, options);
}

export async function verifyUser (id: number) {
    const user = await authRepository.findTokenMatch(id);
    if (!user) throw { code: "notfound_error", message: "User not found" };
}