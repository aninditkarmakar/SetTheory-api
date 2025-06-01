import { Identity } from 'prisma/generated/prisma';

export interface IIdentityRepository {
  getIdentity(providerId: string): Promise<Identity | null>;
}
