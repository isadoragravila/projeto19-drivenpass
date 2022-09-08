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