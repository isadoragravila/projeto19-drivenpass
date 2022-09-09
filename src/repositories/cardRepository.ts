import { client } from "../databases/database";
import { ICardData } from "../types/cardTypes";

export async function findByTitleAndUserId(userId: number, title: string) {
    const result = await client.cards.findFirst({ where: { userId, title } });
    return result;
}

export async function insert(card: ICardData) {
    await client.cards.create({ data: card });
}

export async function find(userId: number) {
    const cards = await client.cards.findMany({ where: { userId } });
    return cards;
}

export async function findById(id: number) {
    const card = await client.cards.findUnique({ where: { id } });
    return card;
}

export async function deleteById(id: number) {
    await client.cards.delete({ where: { id } });
}