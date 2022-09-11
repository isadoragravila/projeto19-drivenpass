import { Request, Response } from 'express';
import * as cardService from '../services/cardService';
import { ICardSchema } from '../types/cardTypes';

export async function createCard(req: Request, res: Response) {
    const userId = res.locals.id;
    const card: ICardSchema = req.body;

    const result = await cardService.createCard({userId: Number(userId), ...card});

    return res.status(201).send(result);
}

export async function getCards(req: Request, res: Response) {
    const userId = res.locals.id;

    const result = await cardService.getCards(Number(userId));

    return res.status(200).send(result);
}

export async function getCardById(req: Request, res: Response) {
    const userId = res.locals.id;
    const { cardId } = req.params;

    const result = await cardService.getCardById(Number(userId), Number(cardId));

    return res.status(200).send(result);
}

export async function deleteCardById(req: Request, res: Response) {
    const userId = res.locals.id;
    const { cardId } = req.params;

    const result = await cardService.deleteCardById(Number(userId), Number(cardId));

    return res.status(200).send(result);
}