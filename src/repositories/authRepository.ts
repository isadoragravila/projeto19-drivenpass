import { client } from "../databases/database";
import { users } from "@prisma/client";

export type UserData = Omit<users, 'id' | 'createdAt'>;


export async function findByEmail(email: string) {
    const result = await client.users.findUnique({
        where: {
            email
        }
    });
    return result;
}

export async function insert(user: UserData) {
    await client.users.create({ data: user });
}

export async function findTokenMatch(id: number) {
    const result = await client.users.findUnique({
        where: {
            id
        }
    });
    return result;
}