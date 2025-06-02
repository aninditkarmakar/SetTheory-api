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
import { CreateUserWithIdentityDto, GetUserByIdDto } from './user.dto';
import { IUserService } from 'src/services/UserService';

@Controller('users')
export class UserController {
  public constructor(
    @Inject('IUserService') private readonly _userService: IUserService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserWithIdentityDto) {
    const { firstName, lastName, email, dateOfBirth, identity } = createUserDto;

    // Call the service to create a user with identity
    const userId = await this._userService.createUserWithIdentity(
      {
        firstName,
        lastName,
        email,
        dateOfBirth,
      },
      identity,
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

    return new GetUserByIdDto({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      createdAt: user.createdAt,
      modifiedAt: user.modifiedAt,
    });
  }
}
