import { PrismaClient } from 'prisma/generated/prisma';
import { IIdentityRepository } from '../IIdentityRepository';
import {
  IPrismaClientProvider,
  IPrismaClientProviderToken,
} from 'src/services/PrismaClientService';
import { IdentityModel } from 'src/models/IdentityModel';
import { Inject } from '@nestjs/common';

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

    const identityModel: IdentityModel = {
      id: dbIdentity.id,
      providerId: dbIdentity.provider_id,
      authProvider: dbIdentity.auth_provider,
      createdAt: dbIdentity.created_at,
      user: {
        id: dbIdentity.user.id,
        firstName: dbIdentity.user.first_name,
        lastName: dbIdentity.user.last_name,
        email: dbIdentity.user.email,
        dateOfBirth: dbIdentity.user.date_of_birth,
        createdAt: dbIdentity.user.created_at,
        modifiedAt: dbIdentity.user.modified_at,
      },
    };

    return identityModel;
  }
}
