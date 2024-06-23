import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { UserResponse } from './model/user.response';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './model/create-user-dto';

@Injectable()
export class UserPrismaService implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(body: CreateUserDto): Promise<UserResponse> {
    try {
      const user = this.prisma.user.create({
        data: { email: body.email, name: body.name, password: body.password },
        select: { id: true, email: true, name: true },
      });

      if (!user) throw new BadRequestException('User not created');

      return user;
    } catch (error) {
      throw error;
    }
  }

  list(): Promise<UserResponse[]> {
    try {
      const users = this.prisma.user.findMany({
        select: { id: true, email: true, name: true },
      });

      if (!users) throw new BadRequestException('Users not found');

      return users;
    } catch (error) {
      throw error;
    }
  }
}
