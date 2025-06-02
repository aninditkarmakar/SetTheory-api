import { Inject, Injectable } from '@nestjs/common';
import { IdentityModelCreateInput } from 'src/models/IdentityModel';
import { UserModel, UserModelCreateInput } from 'src/models/UserModel';
import { UserRepository } from 'src/repositories/impl/UserRepository';
import { IUserRepositoryToken } from 'src/repositories/IUserRepository';

// The IUserServiceToken is used for dependency injection
export const IUserServiceToken = 'IUserService';
export interface IUserService {
  createUserWithIdentity(
    user: UserModelCreateInput,
    identity: IdentityModelCreateInput,
  ): Promise<string>;
  getUserById(userId: string): Promise<UserModel | null>;
}

@Injectable()
export class UserService implements IUserService {
  public constructor(
    @Inject(IUserRepositoryToken)
    private readonly _userRepository: UserRepository,
  ) {}

  public async createUserWithIdentity(
    user: UserModelCreateInput,
    identity: IdentityModelCreateInput,
  ): Promise<string> {
    return this._userRepository.createUserWithIdentity(user, identity);
  }

  public async getUserById(userId: string): Promise<UserModel | null> {
    return this._userRepository.getUserById(userId);
  }
}
