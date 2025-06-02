import { IdentityModelCreateInput } from 'src/models/IdentityModel';
import { UserModel, UserModelCreateInput } from 'src/models/UserModel';

// The IUserRepositoryToken is used for dependency injection
export const IUserRepositoryToken = 'IUserRepository';
export interface IUserRepository {
  createUserWithIdentity(
    user: UserModelCreateInput,
    identity: IdentityModelCreateInput,
  ): Promise<string>;
  getUserById(userId: string): Promise<UserModel | null>;
}
