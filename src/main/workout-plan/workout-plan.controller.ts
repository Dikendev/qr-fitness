import { Body, Controller, Get, Post } from '@nestjs/common';
import { WorkoutPlanRepository } from './repository/workout-plan-repository';
import {
  CreateWorkoutPlanDto,
  WorkoutPlanCreateSchema,
  WorkoutPlanResponse,
} from './model/workout-plan-dto';
import { ZodPipe } from '../../pipe/zod/zod.pipe';

@Controller('workout-plan')
export class WorkoutPlanController {
  constructor(private readonly workoutPlanRepository: WorkoutPlanRepository) {}

  @Post()
  async create(
    @Body(new ZodPipe(WorkoutPlanCreateSchema))
    body: CreateWorkoutPlanDto,
  ): Promise<WorkoutPlanResponse> {
    return this.workoutPlanRepository.create(body);
  }

  @Get('list')
  async list(): Promise<WorkoutPlanResponse[]> {
    return this.workoutPlanRepository.list();
  }
}
