import { notes } from "@prisma/client";

export type INoteData = Omit<notes, 'id' | 'createdAt'>;

export type INoteSchema = Omit<INoteData, 'userId'>;