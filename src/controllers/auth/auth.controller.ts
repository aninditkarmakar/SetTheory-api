import { Inject, Post, Req } from '@nestjs/common';
import {
  IIdentityService,
  IIdentityServiceToken,
} from 'src/services/IdentityService';
import { IUserService, IUserServiceToken } from 'src/services/UserService';
import { OAuth2Client } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';
import { SignInRequest } from 'src/middlewares/auth.middleware';
import { AuthProvider } from 'src/enums/AuthProvider';
import { AuthService } from 'src/services/AuthService';

export class AuthController {
  private _googleClient: OAuth2Client;
  public constructor(
    @Inject(IUserServiceToken) private readonly _userService: IUserService,
    @Inject(IIdentityServiceToken)
    private readonly _identityService: IIdentityService,
    private readonly _configService: ConfigService,
    private readonly _authService: AuthService,
  ) {
    this._googleClient = new OAuth2Client(
      this._configService.get<string>('GOOGLE_CLIENT_ID'),
    );
  }

  @Post('auth/sign-in')
  public async signIn(@Req() signInRequest: SignInRequest) {
    const { providerToken, authProvider } = signInRequest.body;
    if (authProvider === AuthProvider.Google) {
      return await this._authService.performGoogleSignIn(providerToken);
    }
  }
}
