import { AuthProvider } from 'src/enums/AuthProvider';
import { UserModel } from './UserModel';
import { Expose, Type } from 'class-transformer';

export class IdentityModel {
  @Expose({ name: 'id' })
  id: string;

  @Expose({ name: 'provider_id' })
  providerId: string;

  @Expose({ name: 'auth_provider' })
  authProvider: AuthProvider;

  @Expose({ name: 'created_at' })
  createdAt: Date;

  @Expose({ name: 'user' })
  @Type(() => UserModel)
  user: UserModel;

  constructor(partial: Partial<IdentityModel>) {
    Object.assign(this, partial);
  }
}

export type IdentityModelCreateInput = {
  providerId: string;
  authProvider: AuthProvider;
};
