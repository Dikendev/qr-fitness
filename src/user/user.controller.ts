import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { ZodPipe } from '../pipe/zod/zod.pipe';
import {
  CreateUserDto,
  CreateUserSchema,
  UserResponse,
} from './model/user.model';

@Controller('user')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @Post()
  async create(
    @Body(new ZodPipe(CreateUserSchema)) body: CreateUserDto,
  ): Promise<UserResponse> {
    console.log(body);
    return this.userRepository.create(body);
  }

  @Get()
  async list(): Promise<UserResponse[]> {
    return this.userRepository.list();
  }

  @Get('find')
  async findById(@Query() query: { id: string }): Promise<UserResponse> {
    return this.userRepository.findById(query.id);
  }

  @Delete('delete')
  async delete(@Query() query: { id: string }): Promise<string> {
    console.log(query);
    return this.userRepository.delete(query.id);
  }
}
