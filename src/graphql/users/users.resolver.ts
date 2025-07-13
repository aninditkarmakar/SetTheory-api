import { Inject } from '@nestjs/common';
import {
  Resolver,
  Query,
  ResolveField,
  Info,
  Args,
  Parent,
} from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { PrismaClient } from 'prisma/generated/prisma';
import {
  IPrismaClientProvider,
  IPrismaClientProviderToken,
} from 'src/services/PrismaClientService';
import { buildPrismaSelect } from 'src/utilities/buildPrismaSelect';
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
  async getUserById(
    parent: any,
    @Args('id') id: string,
    @Info() info: GraphQLResolveInfo,
  ) {
    const userField = info.fieldNodes.find((f) => f.name.value === 'user');
    const select = userField ? buildPrismaSelect(userField) : undefined;
    const user = await this._prisma.user.findUnique({
      where: {
        id,
      },
      ...(select ? { select } : {}),
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

  @ResolveField('identities')
  async getUserIdentities(
    @Parent() user: User,
    @Info() info: GraphQLResolveInfo,
  ) {
    const identityField = info.fieldNodes.find(
      (f) => f.name.value === 'identities',
    );
    const select = identityField ? buildPrismaSelect(identityField) : undefined;

    return this._prisma.identity.findMany({
      where: {
        user_id: user.id,
      },
      ...(select ? { select } : {}),
    });
  }
}
