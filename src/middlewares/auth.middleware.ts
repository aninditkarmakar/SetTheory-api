import { Inject, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import { SignInRequestDto } from 'src/controllers/auth/auth.dto';
import { AuthProvider } from 'src/enums/AuthProvider';
import {
  AuthProviderInfo,
  AuthService,
  IAuthServiceToken,
} from 'src/services/AuthService';

export type SignInRequest = Request<unknown, unknown, SignInRequestDto> & {
  providerInfo?: AuthProviderInfo;
};

export class SignInMiddleware implements NestMiddleware {
  public constructor(
    @Inject(ConfigService)
    private readonly _configService: ConfigService,

    @Inject(IAuthServiceToken)
    private readonly _authService: AuthService,
  ) {}

  public async use(req: SignInRequest, res: Response, next: NextFunction) {
    try {
      if (req.body.auth_provider === AuthProvider.Google) {
        req.providerInfo = await this._authService.verifyGoogleToken(
          req.body.provider_token,
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e: any) {
      throw new UnauthorizedException(
        `Token verification failed. Provider: ${req.body.auth_provider}`,
      );
    }

    next();
  }
}
