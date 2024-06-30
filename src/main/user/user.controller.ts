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
import {
  CreateUserDto,
  CreateUserSchema,
  UserResponse,
} from './model/user.model';
import { ZodPipe } from '../../pipe/zod/zod.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @Post()
  async create(
    @Body(new ZodPipe(CreateUserSchema)) body: CreateUserDto,
  ): Promise<UserResponse> {
    return this.userRepository.create(body);
  }

  @Get('list')
  async list(@Query('full') fullInformation: boolean): Promise<UserResponse[]> {
    return this.userRepository.list(fullInformation);
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
