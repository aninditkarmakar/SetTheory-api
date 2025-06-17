import { Prisma } from 'prisma/generated/prisma';
import { AuthProvider } from 'src/enums/AuthProvider';

// The IIdentityRepositoryToken is used for dependency injection
export const IIdentityRepositoryToken = 'IIdentityRepository';
export interface IIdentityRepository {
  getIdentity(
    providerId: string,
    authProvider: AuthProvider,
  ): Promise<Prisma.IdentityGetPayload<{ include: { user: true } }> | null>;
}
