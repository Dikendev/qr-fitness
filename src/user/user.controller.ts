import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { CreateUserDto, UserSchema } from './model/create-user-dto';
import { UserResponse } from './model/user.response';
import { ZodPipe } from '../pipe/zod/zod.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @Post()
  async create(
    @Body(new ZodPipe(UserSchema)) body: CreateUserDto,
  ): Promise<UserResponse> {
    return this.userRepository.create(body);
  }

  @Get()
  async list(): Promise<UserResponse[]> {
    return this.userRepository.list();
  }
}
