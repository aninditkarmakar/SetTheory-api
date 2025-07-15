import { Inject } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PrismaClient } from 'prisma/generated/prisma';
import {
  IPrismaClientProvider,
  IPrismaClientProviderToken,
} from 'src/services/PrismaClientService';
import { CreateTagDto } from './tags.dto';
import { Tag, TagUsersConnection, TagOnly } from '../graphql';

const DEFAULT_TAKE = 2;

@Resolver('Tag')
export class TagsResolver {
  private readonly _prisma: PrismaClient;

  public constructor(
    @Inject(IPrismaClientProviderToken) prismaProvider: IPrismaClientProvider,
  ) {
    this._prisma = prismaProvider.getPrismaClient();
  }

  @Mutation('createTag')
  async createTag(
    @Args('userId') userId: string,
    @Args('createTagInput') createTagInput: CreateTagDto,
  ): Promise<TagOnly> {
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

  @Mutation('associateTagWithUser')
  async associateTagWithUser(
    @Args('userId') userId: string,
    @Args('tagId') tagId: string,
  ): Promise<boolean> {
    const userTagAssociation = await this._prisma.tag_User.findFirst({
      where: {
        user_id: userId,
        tag_id: tagId,
      },
    });

    if (userTagAssociation) {
      return true;
    }

    const tag = await this._prisma.tag.findUnique({
      where: { id: tagId },
    });

    if (!tag) {
      throw new Error(`Tag with ID ${tagId} not found`);
    }

    const user = await this._prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    await this._prisma.tag_User.create({
      data: {
        user_id: userId,
        tag_id: tagId,
      },
    });

    return true;
  }

  @Query('tags')
  async getTags(): Promise<TagOnly[]> {
    const tags = await this._prisma.tag.findMany({});
    return tags;
  }

  @Query('tag')
  async getTagUsers(@Args('name') tagName: string): Promise<Tag> {
    const tag = await this._prisma.tag.findUnique({
      where: { name: tagName },
    });

    if (!tag) {
      throw new Error(`Tag with name ${tagName} not found`);
    }

    return tag;
  }

  @ResolveField('usersConnection')
  async getUsersConnection(
    @Parent() tag: Tag,
    @Args('after') after: string,
    @Args('take') take: number = DEFAULT_TAKE,
  ): Promise<TagUsersConnection> {
    take = take > DEFAULT_TAKE ? DEFAULT_TAKE : take; // Limit to a maximum of 2 for pagination

    const findManyQuery = {
      take,
      where: {
        tags: {
          some: {
            tag_id: tag.id,
          },
        },
      },
    };

    if (after) {
      findManyQuery['cursor'] = { id: after };
      findManyQuery['skip'] = 1; // Skip the cursor item
    }

    const usersOfTag = await this._prisma.user.findMany(findManyQuery);

    if (usersOfTag.length === 0) return { edges: [] };

    const edges = usersOfTag.map((user) => {
      return {
        node: user,
        cursor: user.id,
      };
    });

    return { edges };
  }
}
