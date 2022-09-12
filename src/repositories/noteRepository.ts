import { client } from "../databases/database";
import { INoteData } from "../types/noteTypes";

export async function findByTitleAndUserId(userId: number, title: string) {
    const result = await client.notes.findUnique({
        where: {
            title_userId: {
                userId,
                title
            }
        }
    });
    return result;
}

export async function insert(note: INoteData) {
    await client.notes.create({ data: note });
}

export async function find(userId: number) {
    const notes = await client.notes.findMany({ where: { userId } });
    return notes;
}

export async function findById(id: number) {
    const note = await client.notes.findUnique({ where: { id } });
    return note;
}

export async function deleteById(id: number) {
    await client.notes.delete({ where: { id } });
}