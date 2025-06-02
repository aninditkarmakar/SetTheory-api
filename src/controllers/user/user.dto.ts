import { Transform, Type } from 'class-transformer';
import {
  IsEmail,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { AuthProvider } from 'src/enums/AuthProvider';

export class CreateIdentityDto {
  @IsNotEmpty()
  @IsString()
  providerId: string;

  @IsNotEmpty()
  @Min(0)
  authProvider: AuthProvider;
}

export class CreateUserWithIdentityDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsISO8601({ strict: true })
  dateOfBirth?: Date;

  @IsNotEmpty()
  @Type(() => CreateIdentityDto)
  identity: CreateIdentityDto;
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
