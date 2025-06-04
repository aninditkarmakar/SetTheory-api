import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { AuthProvider } from 'src/enums/AuthProvider';
import { GetUserByIdDto } from '../user/user.dto';
import { Type } from 'class-transformer';

export class SignInRequestDto {
  @IsNotEmpty()
  @IsString()
  providerId: string;

  @IsNotEmpty()
  @IsNumber()
  authProvider: AuthProvider;

  @IsNotEmpty()
  @IsString()
  providerToken: string;
}

export class SignInResponseDto {
  @Type(() => GetUserByIdDto)
  user: GetUserByIdDto;

  accessToken: string;

  refreshToken?: string;

  expiresIn: number;

  constructor(partial: Partial<SignInResponseDto>) {
    Object.assign(this, partial);
  }
}
