import { Module } from '@nestjs/common';
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

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [
    /** SERVICES */
    AppService,
    {
      provide: IPrismaClientProviderToken,
      useClass: PrismaClientService,
    },
    {
      provide: IUserServiceToken,
      useClass: UserService,
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
export class AppModule {}
