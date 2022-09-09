import { cards } from "@prisma/client";

export type ICardData = Omit<cards, 'id' | "createdAt">;

export type ICardSchema = Omit<ICardData, 'userId'>;