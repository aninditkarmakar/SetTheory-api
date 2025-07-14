import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaClient } from 'prisma/generated/prisma';
import {
  IPrismaClientProvider,
  IPrismaClientProviderToken,
} from 'src/services/PrismaClientService';
import { CreateTagDto } from './tags.dto';

@Resolver('Tag')
export class TagsResolver {
  private readonly _prisma: PrismaClient;

  public constructor(
    @Inject(IPrismaClientProviderToken) prismaProvider: IPrismaClientProvider,
  ) {
    this._prisma = prismaProvider.getPrismaClient();
  }

  @Mutation('createTag')
  async createTagV0(
    @Args('userId') userId: string,
    @Args('createTagInput') createTagInput: CreateTagDto,
  ) {
    const { name: tagName } = createTagInput;
    const existingTag = await this._prisma.tag.findUnique({
      where: { name: tagName },
    });
    if (existingTag) {
      throw new Error(`Tag with name ${tagName} already exists`);
    }

    const tag = await this._prisma.tag.create({
      data: {
        name: tagName,
        users: {
          create: {
            user: {
              connect: { id: userId },
            },
          },
        },
      },
    });

    return tag;
  }

  @Query('tags')
  async getTags() {
    const tags = await this._prisma.tag.findMany({});
    return tags;
  }

  @Query('tag')
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
