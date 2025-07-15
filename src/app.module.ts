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
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersResolver } from './graphql/users/users.resolver';
import { TagsResolver } from './graphql/tags/tags.resolver';
import { AuthProviderResolver } from './graphql/common/AuthProviderResolver';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      graphiql: true,
      typePaths: ['./src/graphql/**/*.graphql'],
      resolvers: {
        AUTH_PROVIDER: AuthProviderResolver,
      },
      definitions: {
        // This will generate the GraphQL types in the specified path every time the application starts
        // Alternatively, on-demand generation can be configured like so mentioned in the NestJS documentation:
        // https://docs.nestjs.com/graphql/quick-start
        path: join(process.cwd(), 'src/graphql/graphql.ts'),
        outputAs: 'class',
        emitTypenameField: true,
      },
    }),
  ],
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

    /**
     * GRAPHQL RESOLVERS
     */
    UsersResolver,
    TagsResolver,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SignInMiddleware).forRoutes('auth/sign-in');
  }
}
