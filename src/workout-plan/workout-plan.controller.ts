import { Controller } from '@nestjs/common';
import { WorkoutPlanRepository } from './repository/workout-plan-repository';

@Controller('workout-plan')
export class WorkoutPlanController {
  constructor(private readonly workoutPlanRepository: WorkoutPlanRepository) {}
}
