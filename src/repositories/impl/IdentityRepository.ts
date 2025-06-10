import { Prisma, PrismaClient } from 'prisma/generated/prisma';
import { IIdentityRepository } from '../IIdentityRepository';
import {
  IPrismaClientProvider,
  IPrismaClientProviderToken,
} from 'src/services/PrismaClientService';
import { Inject } from '@nestjs/common';
import { AuthProvider } from 'src/enums/AuthProvider';

export class IdentityRepository implements IIdentityRepository {
  private readonly _prisma: PrismaClient;

  public constructor(
    @Inject(IPrismaClientProviderToken) prismaProvider: IPrismaClientProvider,
  ) {
    this._prisma = prismaProvider.getPrismaClient();
  }

  public async getIdentity(
    providerId: string,
    authProvider: AuthProvider,
  ): Promise<Prisma.IdentityGetPayload<{ include: { user: true } }> | null> {
    const dbIdentity = await this._prisma.identity.findFirst({
      where: {
        provider_id: providerId,
        auth_provider: authProvider,
      },
      include: {
        user: true,
      },
    });

    if (!dbIdentity) {
      return null;
    }

    return dbIdentity;
  }
}
