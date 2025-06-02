import { AuthProvider } from 'src/enums/AuthProvider';
import { UserModel } from './UserModel';

export interface IdentityModel {
  id: string;
  providerId: string;
  authProvider: AuthProvider;
  createdAt: Date;
  user: UserModel;
}

export type IdentityModelCreateInput = {
  providerId: string;
  authProvider: AuthProvider;
};
