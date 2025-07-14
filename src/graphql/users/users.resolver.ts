import { Inject } from '@nestjs/common';
import { Resolver, Query, ResolveField, Args, Parent } from '@nestjs/graphql';
import { PrismaClient } from 'prisma/generated/prisma';
import {
  IPrismaClientProvider,
  IPrismaClientProviderToken,
} from 'src/services/PrismaClientService';
import { User } from '../graphql';

@Resolver('User')
export class UsersResolver {
  private readonly _prisma: PrismaClient;

  public constructor(
    @Inject(IPrismaClientProviderToken) prismaProvider: IPrismaClientProvider,
  ) {
    this._prisma = prismaProvider.getPrismaClient();
  }

  @Query('user')
  async getUserById(parent: any, @Args('id') id: string) {
    const user = await this._prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        identities: true,
        tags: true,
      },
    });

    return user;
  }

  @ResolveField('tags')
  async getUserTags(@Parent() user: User) {
    return Promise.resolve(user.tags || []);
  }

  @ResolveField('identities')
  async getUserIdentities(@Parent() user: User) {
    return Promise.resolve(user.identities || []);
  }
}
