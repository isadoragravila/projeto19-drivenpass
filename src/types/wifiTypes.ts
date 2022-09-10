import { wifis } from "@prisma/client";

export type IWifiData = Omit<wifis, 'id' | 'createdAt'>;

export type IWifiSchema = Omit<IWifiData, 'userId'>;