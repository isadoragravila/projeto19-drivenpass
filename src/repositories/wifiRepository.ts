import { client } from "../databases/database";
import { IWifiData } from "../types/wifiTypes";

export async function findByTitleAndUserId(userId: number, title: string) {
    const result = await client.wifis.findUnique({
        where: {
            title_userId: {
                userId,
                title
            }
        }
    });
    return result;
}

export async function insert(wifi: IWifiData) {
    await client.wifis.create({ data: wifi });
}

export async function find(userId: number) {
    const wifis = await client.wifis.findMany({ where: { userId } });
    return wifis;
}

export async function findById(id: number) {
    const wifi = await client.wifis.findUnique({ where: { id } });
    return wifi;
}

export async function deleteById(id: number) {
    await client.wifis.delete({ where: { id } });
}