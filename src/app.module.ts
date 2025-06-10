import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  IPrismaClientProviderToken,
  PrismaClientService,
} from './services/PrismaClientService';
import { IUserRepositoryToken } from './repositories/IUserRepository';
import { UserRepository } from './repositories/impl/UserRepository';
import { IIdentityRepositoryToken } from './repositories/IIdentityRepository';
import { IdentityRepository } from './repositories/impl/IdentityRepository';
import { IUserServiceToken, UserService } from './services/UserService';
import { UserController } from './controllers/user/user.controller';
import { SignInMiddleware } from './middlewares/auth.middleware';
import { AuthService, IAuthServiceToken } from './services/AuthService';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
  IdentityService,
  IIdentityServiceToken,
} from './services/IdentityService';
import { AuthController } from './controllers/auth/auth.controller';

@Module({
  imports: [],
  controllers: [AppController, UserController, AuthController],
  providers: [
    /** SERVICES */
    AppService,
    JwtService,
    ConfigService,
    {
      provide: IPrismaClientProviderToken,
      useClass: PrismaClientService,
    },
    {
      provide: IUserServiceToken,
      useClass: UserService,
    },
    {
      provide: IAuthServiceToken,
      useClass: AuthService,
    },
    {
      provide: IIdentityServiceToken,
      useClass: IdentityService,
    },

    // -------------------
    // -------------------

    /**
     * REPOSITORIES
     */
    {
      provide: IUserRepositoryToken,
      useClass: UserRepository,
    },
    {
      provide: IIdentityRepositoryToken,
      useClass: IdentityRepository,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SignInMiddleware).forRoutes('auth/sign-in');
  }
}
