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
  provider_id: string;

  @IsNotEmpty()
  @Min(0)
  auth_provider: AuthProvider;

  constructor(partial: Partial<CreateIdentityDto>) {
    Object.assign(this, partial);
  }
}

export class CreateUserWithIdentityDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsISO8601({ strict: true })
  date_of_birth?: Date;

  @IsNotEmpty()
  @Type(() => CreateIdentityDto)
  identity: CreateIdentityDto;

  constructor(partial: Partial<GetUserByIdDto>) {
    Object.assign(this, partial);
  }
}

export class GetUserByIdDto {
  id: string;

  first_name: string;

  last_name: string | null;

  email: string | null;

  @Transform(({ value }: { value: Date | null }) =>
    value && value instanceof Date ? value.toISOString().split('T')[0] : null,
  )
  date_of_birth: Date | null;

  created_at: Date;

  modified_at: Date;

  constructor(partial: Partial<GetUserByIdDto>) {
    Object.assign(this, partial);
  }
}
