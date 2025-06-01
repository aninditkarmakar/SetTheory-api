import { Identity, PrismaClient } from 'prisma/generated/prisma';
import { IIdentityRepository } from '../IIdentityRepository';
import { PrismaClientProvider } from 'src/providers/PrismaClientProvider';

export class IdentityRepository implements IIdentityRepository {
  private readonly _prisma: PrismaClient;

  public constructor(prismaProvider: PrismaClientProvider) {
    this._prisma = prismaProvider.getPrismaClient();
  }

  public async getIdentity(providerId: string): Promise<Identity | null> {
    return await this._prisma.identity.findFirst({
      where: {
        provider_id: providerId,
      },
      include: {
        user: true,
      },
    });
  }
}
