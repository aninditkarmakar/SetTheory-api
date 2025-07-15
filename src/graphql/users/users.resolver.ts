import { Inject } from '@nestjs/common';
import { Resolver, Query, ResolveField, Args, Parent } from '@nestjs/graphql';
import { PrismaClient } from 'prisma/generated/prisma';
import {
  IPrismaClientProvider,
  IPrismaClientProviderToken,
} from 'src/services/PrismaClientService';
import { User } from '../graphql';

const DEFAULT_TAKE = 2;

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
    const dbUser = await this._prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        identities: true,
      },
    });

    return dbUser;
  }

  @ResolveField('tagsConnection')
  async getUserTags(
    @Parent() user: User,
    @Args('take') take: number = DEFAULT_TAKE,
    @Args('after') after: string | null = null,
  ) {
    take = take > DEFAULT_TAKE ? DEFAULT_TAKE : take;
    const findManyArgs = {
      take,
      where: {
        users: {
          some: {
            user_id: user.id,
          },
        },
      },
    };

    if (after) {
      findManyArgs['cursor'] = {
        id: after,
      };
      findManyArgs['skip'] = 1; // Skip the cursor item
    }

    const tags = await this._prisma.tag.findMany(findManyArgs);

    const edges = tags.map((tag) => ({
      cursor: tag.id,
      node: tag,
    }));

    return { edges };
  }

  @ResolveField('identities')
  async getUserIdentities(@Parent() user: User) {
    return Promise.resolve(user.identities || []);
  }
}
