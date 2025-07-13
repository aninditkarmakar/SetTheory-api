import { Inject } from '@nestjs/common';
import { Resolver, Query, ResolveField } from '@nestjs/graphql';
import { PrismaClient } from 'prisma/generated/prisma';
import {
  IPrismaClientProvider,
  IPrismaClientProviderToken,
} from 'src/services/PrismaClientService';

@Resolver('User')
export class UsersResolver {
  private readonly _prisma: PrismaClient;

  public constructor(
    @Inject(IPrismaClientProviderToken) prismaProvider: IPrismaClientProvider,
  ) {
    this._prisma = prismaProvider.getPrismaClient();
  }

  @Query('user')
  async getUserById(parent: any, args: { id: string }) {
    console.log('Fetching user with ID:', args.id);
    const user = await this._prisma.user.findUnique({
      where: {
        id: args.id,
      },
    });

    return user;
  }

  @ResolveField('tags')
  async getUserTags() {
    return Promise.resolve([
      {
        id: '1',
        name: 'Example Tag',
      },
    ]);
  }
}
