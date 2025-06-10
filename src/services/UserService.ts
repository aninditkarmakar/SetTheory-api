import { Inject, Injectable } from '@nestjs/common';
import { Prisma, User } from 'prisma/generated/prisma';
import { UserRepository } from 'src/repositories/impl/UserRepository';
import { IUserRepositoryToken } from 'src/repositories/IUserRepository';

// The IUserServiceToken is used for dependency injection
export const IUserServiceToken = 'IUserService';
export interface IUserService {
  createUserWithIdentity(
    user: Prisma.UserCreateWithoutIdentitiesInput,
    identity: Prisma.IdentityCreateWithoutUserInput,
  ): Promise<User>;

  getUserById(userId: string): Promise<User | null>;
}

@Injectable()
export class UserService implements IUserService {
  public constructor(
    @Inject(IUserRepositoryToken)
    private readonly _userRepository: UserRepository,
  ) {}

  public async createUserWithIdentity(
    user: Prisma.UserCreateWithoutIdentitiesInput,
    identity: Prisma.IdentityCreateWithoutUserInput,
  ): Promise<User> {
    return this._userRepository.createUserWithIdentity(user, identity);
  }

  public async getUserById(userId: string): Promise<User | null> {
    return this._userRepository.getUserById(userId);
  }
}
