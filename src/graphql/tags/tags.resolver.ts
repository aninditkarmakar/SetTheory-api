import { Inject } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { PrismaClient } from 'prisma/generated/prisma';
import {
  IPrismaClientProvider,
  IPrismaClientProviderToken,
} from 'src/services/PrismaClientService';

@Resolver('Tag')
export class TagsResolver {
  private readonly _prisma: PrismaClient;

  public constructor(
    @Inject(IPrismaClientProviderToken) prismaProvider: IPrismaClientProvider,
  ) {
    this._prisma = prismaProvider.getPrismaClient();
  }

  @Query('allTags')
  async getTags() {
    const tags = await this._prisma.tag.findMany({});
    return tags;
  }

  @Query('tagUsers')
  async getTagUsers(@Args('name') tagName: string) {
    const tag = await this._prisma.tag.findUnique({
      where: { name: tagName },
      include: {
        users: {
          include: { user: true },
        },
      },
    });

    if (!tag) {
      throw new Error(`Tag with name ${tagName} not found`);
    }

    return {
      ...tag,
      users: tag.users.map((userTag) => userTag.user),
    };
  }
}
