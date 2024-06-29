import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UserResponse } from './model/user.model';
import { WorkoutPlan } from '../workout-plan/model/workout-plan-dto';
import { Exercise } from '../exercise/model/exercise.model';

@Injectable()
export class UserPrismaService implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateUserDto): Promise<UserResponse> {
    console.log(body);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: body.email,
          name: body.name,
          password: body.password,
          workouts: {
            create: body.workouts?.map((workout) => ({
              name: workout.name,
              description: workout.description,
              workoutType: workout.workoutType,
              exercises: {
                create: workout.exercises?.map((exercise) => ({
                  name: exercise.name,
                  description: exercise.description,
                  sets: exercise.sets,
                  reps: exercise.reps,
                })),
              },
            })),
          },
        },
        select: {
          id: true,
          name: true,
          email: true,
          workouts: {
            select: {
              id: true,
              name: true,
              description: true,
              workoutType: true,
              exercises: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                  sets: true,
                  reps: true,
                  createdAt: true,
                  updatedAt: true,
                },
              },
              createdAt: true,
              updatedAt: true,
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!user) throw new BadRequestException('User not created');

      return user;
    } catch (error) {
      throw error;
    }
  }

  async list(): Promise<UserResponse[]> {
    try {
      const users = await this.prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          workouts: {
            select: {
              id: true,
              name: true,
              description: true,
              workoutType: true,
              createdAt: true,
              updatedAt: true,
              exercises: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                  sets: true,
                  reps: true,
                  createdAt: true,
                  updatedAt: true,
                },
              },
            },
          },
          updatedAt: true,
          createdAt: true,
        },
      });

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
        select: {
          id: true,
          name: true,
          email: true,
          workouts: {
            select: {
              id: true,
              name: true,
              description: true,
              workoutType: true,
              createdAt: true,
              updatedAt: true,
              exercises: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                  sets: true,
                  reps: true,
                  createdAt: true,
                  updatedAt: true,
                },
              },
            },
          },
          updatedAt: true,
          createdAt: true,
        },
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
