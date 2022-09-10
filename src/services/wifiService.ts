import { verifyUser } from './authService';
import * as wifiRepository from '../repositories/wifiRepository';
import Cryptr from 'cryptr';
import { IWifiData } from '../types/wifiTypes';

export async function createWifi(wifiData: IWifiData) {
    const { userId, title, password } = wifiData;
    await verifyUser(userId);
    await verifyTitle(userId, title);

    const wifis = { ...wifiData, password: encryptPassword(password) };

    await wifiRepository.insert(wifis);

    return "Wifi created";
}

async function verifyTitle (userId: number, title: string) {
    const result = await wifiRepository.findByTitleAndUserId(userId, title);
    if (result) throw { code: "conflict_error", message: "This title already exists" };
}

function encryptPassword (password: string) {
    const cryptr = new Cryptr(process.env.CRYPTR_SECRET || "");
    const encryptedPassword = cryptr.encrypt(password);

    return encryptedPassword;
}

export async function getWifis(userId: number) {
    await verifyUser(userId);

    const wifis = await wifiRepository.find(userId);

    wifis.map(item => item.password = decryptPassword(item.password));

    return wifis;
}

function decryptPassword (password: string) {
    const cryptr = new Cryptr(process.env.CRYPTR_SECRET || "");
    const decryptedPassword = cryptr.decrypt(password);

    return decryptedPassword;
}

export async function getWifiById(userId: number, wifiId: number) {
    await verifyUser(userId);

    const wifi = await verifyWifiAndUserId(userId, wifiId);

    return { ...wifi, password: decryptPassword(wifi.password) };
}

export async function deleteWifiById(userId: number, wifiId: number) {
    await verifyUser(userId);

    await verifyWifiAndUserId(userId, wifiId);
    
    await wifiRepository.deleteById(wifiId);

    return "Wifi deleted";
}

async function verifyWifiAndUserId(userId: number, wifiId: number) {
    const wifi = await wifiRepository.findById(wifiId);

    if(!wifi) throw { code: "notfound_error", message: "This wifi doesn't exist" };

    if (wifi.userId !== userId) throw { code: "unauthorized_error", message: "This wifi doesn't belong to this user" };

    return wifi;
}