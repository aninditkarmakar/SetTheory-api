import { Inject } from '@nestjs/common';
import { Resolver, Query, ResolveField } from '@nestjs/graphql';
import { IUserService } from 'src/services/UserService';

@Resolver('User')
export class UsersResolver {
  public constructor(
    @Inject('IUserService') private readonly _userService: IUserService,
  ) {}

  @Query('user')
  async getUserById(parent: any, args: { id: string }) {
    console.log('Fetching user with ID:', args.id);
    const user = await this._userService.getUserById(args.id);
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
