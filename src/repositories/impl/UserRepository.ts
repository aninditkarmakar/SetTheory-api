import { PrismaClient } from 'prisma/generated/prisma';
import { IUserRepository } from '../IUserRepository';
import {
  IPrismaClientProvider,
  IPrismaClientProviderToken,
} from 'src/services/PrismaClientService';
import { UserModel, UserModelCreateInput } from 'src/models/UserModel';
import { IdentityModelCreateInput } from 'src/models/IdentityModel';
import { Inject } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

export class UserRepository implements IUserRepository {
  private readonly _prisma: PrismaClient;

  public constructor(
    @Inject(IPrismaClientProviderToken) prismaProvider: IPrismaClientProvider,
  ) {
    this._prisma = prismaProvider.getPrismaClient();
  }

  public async createUserWithIdentity(
    user: UserModelCreateInput,
    identity: IdentityModelCreateInput,
  ): Promise<UserModel> {
    const result = await this._prisma.user.create({
      data: {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        date_of_birth: user.dateOfBirth,
        identities: {
          create: [
            {
              provider_id: identity.providerId,
              auth_provider: identity.authProvider,
            },
          ],
        },
      },
    });

    return plainToInstance(UserModel, result);
  }

  public async getUserById(userId: string): Promise<UserModel | null> {
    const dbUser = await this._prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!dbUser) {
      return null;
    }

    const userModel: UserModel = {
      id: dbUser.id,
      firstName: dbUser.first_name,
      lastName: dbUser.last_name,
      email: dbUser.email,
      dateOfBirth: dbUser.date_of_birth,
      createdAt: dbUser.created_at,
      modifiedAt: dbUser.modified_at,
    };

    return userModel;
  }
}
