import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import {
  CreateIdentityDto,
  CreateUserWithIdentityDto,
  GetUserByIdDto,
} from './user.dto';
import { IUserService } from 'src/services/UserService';
import { instanceToPlain } from 'class-transformer';
import { Prisma } from 'prisma/generated/prisma';

@Controller('users')
export class UserController {
  public constructor(
    @Inject('IUserService') private readonly _userService: IUserService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserWithIdentityDto) {
    const plainUserObj = instanceToPlain(
      new CreateUserWithIdentityDto({ ...createUserDto }),
    ) as Prisma.UserCreateWithoutIdentitiesInput;

    const plainIdentityObj = instanceToPlain(
      new CreateIdentityDto({ ...createUserDto.identity }),
    ) as Prisma.IdentityCreateWithoutUserInput;

    // Call the service to create a user with identity
    const userId = await this._userService.createUserWithIdentity(
      plainUserObj,
      plainIdentityObj,
    );

    return {
      userId: userId,
    };
  }

  @Get(':id')
  async getUserById(@Param('id') userId: string): Promise<GetUserByIdDto> {
    // Call the service to get user by ID
    const user = await this._userService.getUserById(userId);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return new GetUserByIdDto({ ...user });
  }
}
