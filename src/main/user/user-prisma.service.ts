import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { CreateUserDto, UserResponse } from './model/user.model';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserPrismaService implements UserRepository {
  exercisesSelectResponse = {
    select: {
      id: true,
      name: true,
      description: true,
      sets: true,
      reps: true,
      createdAt: true,
      updatedAt: true,
    },
  };

  workoutsSelectResponse = {
    select: {
      id: true,
      name: true,
      description: true,
      workoutType: true,
      exercises: {
        select: this.exercisesSelectResponse.select,
      },
      createdAt: true,
      updatedAt: true,
    },
  };

  userSelectResponse = {
    select: {
      id: true,
      name: true,
      email: true,
      workouts: this.workoutsSelectResponse,
      createdAt: true,
      updatedAt: true,
    },
  };

  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateUserDto): Promise<UserResponse> {
    try {
      const user = await this.prisma.user.create({
        data: {
          email: body.email,
          name: body.name,
          password: body.password,
          // worksheet: {
          //   create: body.workouts?.map((workout) => ({
          //     name: workout.name,
          //     description: workout.description,
          //     sessionGroup: workout.workoutType,
          //     exercises: {
          //       create: workout.exercises?.map((exercise) => ({
          //         name: exercise.name,
          //         description: exercise.description,
          //         sets: exercise.sets,
          //         reps: exercise.reps,
          //       })),
          //     },
          //   })),
          // },
        },
        select: this.userSelectResponse.select,
      });

      if (!user) throw new BadRequestException('User not created');

      return user;
    } catch (error) {
      throw error;
    }
  }

  async list(fullInformation: boolean): Promise<UserResponse[]> {
    let select = {
      id: true,
      name: true,
      email: true,
      updatedAt: true,
      createdAt: true,
    };

    if (fullInformation) {
      select['workouts'] = this.workoutsSelectResponse;
    }

    try {
      const users = await this.prisma.user.findMany({ select });

      if (!users) throw new BadRequestException('Users not found');
      return users;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<UserResponse> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        select: this.userSelectResponse.select,
      });

      if (!user) throw new BadRequestException('User not found');
      return user;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<string> {
    try {
      const user = await this.prisma.user.delete({
        where: { id },
        select: { id: true, name: true },
      });

      if (!user) throw new BadRequestException('User not deleted');
      return `User ${user.name} with id: ${user.id} deleted`;
    } catch (error) {
      throw error;
    }
  }
}
