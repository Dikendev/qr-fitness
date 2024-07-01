import { Injectable } from '@nestjs/common';
import { WorkoutPlanRepository } from './repository/workout-plan-repository';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateWorkoutPlanDto,
  WorkoutPlanResponse,
} from './model/workout-plan-dto';

@Injectable()
export class WorkoutPlanService implements WorkoutPlanRepository {
  exerciseSelect = {
    select: {
      id: true,
      name: true,
      description: true,
      sets: true,
      reps: true,
      updatedAt: true,
      createdAt: true,
    },
  };

  workoutPlanSelect = {
    select: {
      id: true,
      name: true,
      description: true,
      workoutType: true,
      exercises: this.exerciseSelect,
      createdAt: true,
      updatedAt: true,
    },
  };

  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateWorkoutPlanDto): Promise<WorkoutPlanResponse> {
    try {
      const workoutPlan = await this.prisma.$transaction(async (prisma) => {
        const connectExercises = body.exercises
          ?.filter((exercise) => exercise.id)
          .map((exercise) => ({ id: exercise.id }));

        const exercisesBulk = body.exercises?.map((exercise) => {
          return {
            where: { id: exercise.id ?? '' },
            create: {
              name: exercise.name ?? '',
              description: exercise.description ?? '',
              sets: exercise.sets ?? 0,
              reps: exercise.reps ?? 0,
            },
          };
        });

        const workoutPlan = await prisma.workout.create({
          data: {
            name: body.name,
            description: body.description,
            workoutType: body.workoutType,
            userId: body?.userId,
            exercises: {
              connect: connectExercises,
              connectOrCreate: exercisesBulk,
            },
          },
          select: this.workoutPlanSelect.select,
        });

        return workoutPlan;
      });

      return workoutPlan;
    } catch (error) {
      throw new Error('Failed to create workout plan');
    }
  }

  async list(): Promise<WorkoutPlanResponse[]> {
    try {
      const exercises = this.prisma.workout.findMany({
        select: this.workoutPlanSelect.select,
      });

      if (!exercises) {
        throw new Error('No exercises found');
      }

      return exercises;
    } catch (error) {
      throw new Error();
    }
  }
}
