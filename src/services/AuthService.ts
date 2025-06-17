import { Inject, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { IIdentityService, IIdentityServiceToken } from './IdentityService';
import { AuthProvider } from 'src/enums/AuthProvider';
import { IUserService, IUserServiceToken } from './UserService';
import { SignInResponseDto } from 'src/controllers/auth/auth.dto';

export interface AuthProviderInfo {
  providerId: string;
  email: string | undefined;
  firstName: string | undefined;
}

export interface TokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
}

export interface JwtPayload {
  userId: string;
  email: string | null;
  iat?: number;
  exp?: number;
}

export const IAuthServiceToken = 'IAuthService';
export interface IAuthService {
  generateJwtTokens(userId: string, email: string | null): TokenResponse;
  verifyGoogleToken(token: string): Promise<AuthProviderInfo>;
  performGoogleSignIn(googleToken: string): Promise<SignInResponseDto>;
}

export class AuthService implements IAuthService {
  private _googleClient: OAuth2Client;

  public constructor(
    private readonly _configService: ConfigService,
    private readonly _jwtService: JwtService,

    @Inject(IIdentityServiceToken)
    private readonly _identityService: IIdentityService,

    @Inject(IUserServiceToken)
    private readonly _userService: IUserService,
  ) {
    this._googleClient = new OAuth2Client(
      this._configService.get<string>('GOOGLE_CLIENT_ID'),
    );
  }

  // Generate JWT tokens
  public generateJwtTokens(
    userId: string,
    email: string | null,
  ): TokenResponse {
    const payload: JwtPayload = { userId, email };

    const accessToken = this._jwtService.sign(payload, {
      secret: this._configService.get<string>('JWT_SECRET'),
      expiresIn: this._configService.get<string>(
        'JWT_REFRESH_EXPIRES_IN',
        '1d',
      ),
    });

    const refreshToken = this._jwtService.sign(payload, {
      secret: this._configService.get<string>('JWT_SECRET'),
      expiresIn: this._configService.get<string>(
        'JWT_REFRESH_EXPIRES_IN',
        '7d',
      ),
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: this.getTokenExpirationTime(),
    };
  }

  // Verifies the Google ID token and returns the provider information.
  // Throws an UnauthorizedException if the token is invalid or cannot be verified.
  public async verifyGoogleToken(token: string): Promise<AuthProviderInfo> {
    const ticket = await this._googleClient.verifyIdToken({
      idToken: token,
      audience: this._configService.get<string>('GOOGLE_CLIENT_ID'),
    });

    const payload = ticket.getPayload();

    if (!payload) {
      throw new UnauthorizedException(`Invalid google token. Provider`);
    }

    return {
      providerId: payload.sub,
      email: payload.email,
      firstName: payload.given_name,
    };
  }

  public async performGoogleSignIn(
    googleToken: string,
  ): Promise<SignInResponseDto> {
    const googleInfo = await this.verifyGoogleToken(googleToken);

    const identityWithUser = await this._identityService.getUserByProviderId(
      googleInfo.providerId,
      AuthProvider.Google,
    );

    console.log(`performGoogleSignin: `, identityWithUser);
    if (!identityWithUser) {
      // If not, create a new user with the identity
      const user = await this._userService.createUserWithIdentity(
        {
          first_name: googleInfo.firstName || '',
          email: googleInfo.email || '',
        },
        {
          provider_id: googleInfo.providerId,
          auth_provider: AuthProvider.Google,
        },
      );
      const tokens = this.generateJwtTokens(user.id, user.email);

      return new SignInResponseDto({
        user,
        ...tokens,
      });
    } else {
      // If the identity exists, use the associated user
      const tokens = this.generateJwtTokens(
        identityWithUser.user.id,
        identityWithUser.user.email,
      );

      return new SignInResponseDto({
        user: identityWithUser.user,
        ...tokens,
      });
    }
  }

  // Helper method to get token expiration time in seconds
  private getTokenExpirationTime(): number {
    const expiresIn = this._configService.get<string>('JWT_EXPIRES_IN', '1d');

    // Convert to seconds (simple conversion for common formats)
    if (expiresIn.endsWith('d')) {
      return parseInt(expiresIn) * 24 * 60 * 60;
    } else if (expiresIn.endsWith('h')) {
      return parseInt(expiresIn) * 60 * 60;
    } else if (expiresIn.endsWith('m')) {
      return parseInt(expiresIn) * 60;
    }

    return parseInt(expiresIn); // Assume seconds if no unit
  }
}
