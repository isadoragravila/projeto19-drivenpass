import { verifyUser } from './authService';
import * as cardRepository from '../repositories/cardRepository';
import Cryptr from 'cryptr';
import { ICardData } from '../types/cardTypes';

export async function createCard(cardData: ICardData) {
    const { userId, title, password, securityCode } = cardData;
    await verifyUser(userId);
    await verifyTitle(userId, title);

    const card = { ...cardData, password: encryptPassword(password), securityCode: encryptPassword(securityCode) };

    await cardRepository.insert(card);

    return "Card created";
}

async function verifyTitle (userId: number, title: string) {
    const result = await cardRepository.findByTitleAndUserId(userId, title);
    if (result) throw { code: "conflict_error", message: "This title already exists" };
}

function encryptPassword (password: string) {
    const cryptr = new Cryptr(process.env.CRYPTR_SECRET || "");
    const encryptedPassword = cryptr.encrypt(password);

    return encryptedPassword;
}

export async function getCards(userId: number) {
    await verifyUser(userId);

    const cards = await cardRepository.find(userId);

    cards.map(item => {
        item.password = decryptPassword(item.password);
        item.securityCode = decryptPassword(item.securityCode);
    });

    return cards;
}

function decryptPassword (password: string) {
    const cryptr = new Cryptr(process.env.CRYPTR_SECRET || "");
    const decryptedPassword = cryptr.decrypt(password);

    return decryptedPassword;
}

export async function getCardById(userId: number, cardId: number) {
    await verifyUser(userId);

    const card = await verifyCardAndUserId(userId, cardId);

    return { ...card, password: decryptPassword(card.password), securityCode: decryptPassword(card.securityCode)};
}

export async function deleteCardById(userId: number, cardId: number) {
    await verifyUser(userId);

    await verifyCardAndUserId(userId, cardId);
    
    await cardRepository.deleteById(cardId);

    return "Card deleted";
}

async function verifyCardAndUserId(userId: number, cardId: number) {
    const card = await cardRepository.findById(cardId);

    if(!card) throw { code: "notfound_error", message: "This card doesn't exist" };

    if (card.userId !== userId) throw { code: "unauthorized_error", message: "This card doesn't belong to this user" };

    return card;
}