import { Injectable } from '@nestjs/common';
import { WorkoutPlanRepository } from './repository/workout-plan-repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WorkoutPlanService implements WorkoutPlanRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createWorkoutPlan(): Promise<void> {
    // const workoutPlan = await this.prisma.workout.create({ data: {} });
  }

  listWorkoutPlan(): void {}
}
