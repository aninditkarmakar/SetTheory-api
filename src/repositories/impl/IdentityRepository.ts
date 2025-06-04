import { PrismaClient } from 'prisma/generated/prisma';
import { IIdentityRepository } from '../IIdentityRepository';
import {
  IPrismaClientProvider,
  IPrismaClientProviderToken,
} from 'src/services/PrismaClientService';
import { IdentityModel } from 'src/models/IdentityModel';
import { Inject } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

export class IdentityRepository implements IIdentityRepository {
  private readonly _prisma: PrismaClient;

  public constructor(
    @Inject(IPrismaClientProviderToken) prismaProvider: IPrismaClientProvider,
  ) {
    this._prisma = prismaProvider.getPrismaClient();
  }

  public async getIdentity(providerId: string): Promise<IdentityModel | null> {
    const dbIdentity = await this._prisma.identity.findFirst({
      where: {
        provider_id: providerId,
      },
      include: {
        user: true,
      },
    });

    if (!dbIdentity) {
      return null;
    }

    return plainToInstance(IdentityModel, dbIdentity);
  }
}
