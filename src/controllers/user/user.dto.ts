import { Transform } from 'class-transformer';
import { AuthProvider } from 'src/enums/AuthProvider';

export class CreateUserWithIdentityDto {
  user: {
    firstName: string;
    lastName?: string;
    email?: string;
    dateOfBirth?: Date;
  };

  identity: {
    providerId: string;
    authProvider: AuthProvider;
  };
}

export class GetUserByIdDto {
  id: string;
  firstName: string;
  lastName: string | null;
  email: string | null;

  @Transform(({ value }: { value: Date | null }) =>
    value && value instanceof Date ? value.toISOString().split('T')[0] : null,
  )
  dateOfBirth: Date | null;
  createdAt: Date;
  modifiedAt: Date;

  constructor(partial: Partial<GetUserByIdDto>) {
    Object.assign(this, partial);
  }
}
