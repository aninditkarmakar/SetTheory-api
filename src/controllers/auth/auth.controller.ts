import {
  BadRequestException,
  Controller,
  Inject,
  Post,
  Req,
} from '@nestjs/common';
import { SignInRequest } from 'src/middlewares/auth.middleware';
import { AuthProvider } from 'src/enums/AuthProvider';
import { AuthService, IAuthServiceToken } from 'src/services/AuthService';
import { SignInResponseDto } from './auth.dto';

@Controller()
export class AuthController {
  public constructor(
    @Inject(IAuthServiceToken) private readonly _authService: AuthService,
  ) {}

  @Post('auth/sign-in')
  public async signIn(
    @Req() signInRequest: SignInRequest,
  ): Promise<SignInResponseDto> {
    const { provider_token, auth_provider } = signInRequest.body;
    console.log(`Provider Token: `, provider_token);

    if (auth_provider === AuthProvider.Google) {
      return await this._authService.performGoogleSignIn(provider_token);
    } else {
      throw new BadRequestException(
        `Unsupported auth provider: ${auth_provider}`,
      );
    }
  }
}
