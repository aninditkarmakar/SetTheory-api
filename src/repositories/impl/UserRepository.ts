import { Identity, PrismaClient, User } from 'prisma/generated/prisma';
import { IUserRepository } from '../IUserRepository';
import { PrismaClientProvider } from 'src/providers/PrismaClientProvider';

export class UserRepository implements IUserRepository {
  private readonly _prisma: PrismaClient;

  public constructor(prismaProvider: PrismaClientProvider) {
    this._prisma = prismaProvider.getPrismaClient();
  }

  public async createUserWithIdentity(
    user: User,
    identity: Identity,
  ): Promise<string> {
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

    return result.id;
  }

  public async getUserById(userId: string): Promise<User | null> {
    return await this._prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }
}
