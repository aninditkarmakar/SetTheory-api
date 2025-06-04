import { AuthProvider } from 'src/enums/AuthProvider';
import { IdentityModel } from 'src/models/IdentityModel';

export const IIdentityServiceToken = 'IIdentityService';
export interface IIdentityService {
  getUserByIdProviderId(
    providerId: string,
    authProvider: AuthProvider,
  ): Promise<IdentityModel | null>;
}
