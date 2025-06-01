import { Identity, User } from 'prisma/generated/prisma';

export interface IUserRepository {
  createUserWithIdentity(user: User, identity: Identity): Promise<string>;
  getUserById(userId: string): Promise<User | null>;
}
