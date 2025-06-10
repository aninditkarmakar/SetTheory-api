import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { AuthProvider } from 'src/enums/AuthProvider';
import { GetUserByIdDto } from '../user/user.dto';
import { Type } from 'class-transformer';
import { PartialExisting } from 'src/utilities/utilityTypes';

export class SignInRequestDto {
  @IsNotEmpty()
  @IsString()
  provider_id: string;

  @IsNotEmpty()
  @IsNumber()
  auth_provider: AuthProvider;

  @IsNotEmpty()
  @IsString()
  provider_token: string;
}

export class SignInResponseDto {
  @Type(() => GetUserByIdDto)
  user: GetUserByIdDto;

  access_token: string;

  refresh_token?: string;

  expires_in: number;

  constructor(
    partial: PartialExisting<SignInResponseDto, keyof SignInResponseDto>,
  ) {
    Object.assign(this, partial);
  }
}
