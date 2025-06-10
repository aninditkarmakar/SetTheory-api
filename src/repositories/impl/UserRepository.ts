import { Prisma, PrismaClient, User } from 'prisma/generated/prisma';
import { IUserRepository } from '../IUserRepository';
import {
  IPrismaClientProvider,
  IPrismaClientProviderToken,
} from 'src/services/PrismaClientService';
import { Inject } from '@nestjs/common';

export class UserRepository implements IUserRepository {
  private readonly _prisma: PrismaClient;

  public constructor(
    @Inject(IPrismaClientProviderToken) prismaProvider: IPrismaClientProvider,
  ) {
    this._prisma = prismaProvider.getPrismaClient();
  }

  public async createUserWithIdentity(
    user: Prisma.UserCreateWithoutIdentitiesInput,
    identity: Prisma.IdentityCreateWithoutUserInput,
  ): Promise<User> {
    const result = await this._prisma.user.create({
      data: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        date_of_birth: user.date_of_birth,
        identities: {
          create: [
            {
              provider_id: identity.provider_id,
              auth_provider: identity.auth_provider,
            },
          ],
        },
      },
    });

    return result;
  }

  public async getUserById(userId: string): Promise<User | null> {
    const dbUser = await this._prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!dbUser) {
      return null;
    }

    return dbUser;
  }
}
