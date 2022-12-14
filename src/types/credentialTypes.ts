import { credentials } from "@prisma/client";

export type ICredentialData = Omit<credentials, 'id' | 'createdAt'>;

export type ICredentialSchema = Omit<ICredentialData, 'userId'>;