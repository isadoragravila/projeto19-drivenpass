import { client } from "../databases/database";
import { credentials } from "@prisma/client";

export type CredentialData = Omit<credentials, 'id' | 'createdAt'>;


export async function findByTitleAndUserId(userId: number, title: string) {
    const result = await client.credentials.findFirst({ where: { userId, title } });
    return result;
}

export async function insert(credential: CredentialData) {
    await client.credentials.create({ data: credential });
}

export async function find(userId: number) {
    const credentials = await client.credentials.findMany({ where: { userId } });
    return credentials;
}

export async function findById(id: number) {
    const credentials = await client.credentials.findUnique({ where: { id } });
    return credentials;
}