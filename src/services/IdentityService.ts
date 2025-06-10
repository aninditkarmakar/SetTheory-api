import { Inject } from '@nestjs/common';
import { Prisma } from 'prisma/generated/prisma';
import { AuthProvider } from 'src/enums/AuthProvider';
import {
  IIdentityRepository,
  IIdentityRepositoryToken,
} from 'src/repositories/IIdentityRepository';

export const IIdentityServiceToken = 'IIdentityService';
export interface IIdentityService {
  getUserByProviderId(
    providerId: string,
    authProvider: AuthProvider,
  ): Promise<Prisma.IdentityGetPayload<{ include: { user: true } }> | null>;
}

export class IdentityService implements IIdentityService {
  public constructor(
    @Inject(IIdentityRepositoryToken)
    private readonly _identityRepository: IIdentityRepository,
  ) {}

  public async getUserByProviderId(
    providerId: string,
    authProvider: AuthProvider,
  ): Promise<Prisma.IdentityGetPayload<{ include: { user: true } }> | null> {
    return await this._identityRepository.getIdentity(providerId, authProvider);
  }
}
