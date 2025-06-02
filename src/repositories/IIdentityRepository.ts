import { IdentityModel } from 'src/models/IdentityModel';

// The IIdentityRepositoryToken is used for dependency injection
export const IIdentityRepositoryToken = 'IIdentityRepository';
export interface IIdentityRepository {
  getIdentity(providerId: string): Promise<IdentityModel | null>;
}
