import { Prisma, User } from 'prisma/generated/prisma';

// The IUserRepositoryToken is used for dependency injection
export const IUserRepositoryToken = 'IUserRepository';
export interface IUserRepository {
  createUserWithIdentity(
    user: Prisma.UserCreateInput,
    identity: Prisma.IdentityCreateInput,
  ): Promise<User>;

  getUserById(userId: string): Promise<User | null>;
}
