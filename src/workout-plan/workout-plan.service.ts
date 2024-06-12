import { Injectable } from '@nestjs/common';
import { WorkoutPlanRepository } from './repository/workout-plan-repository';
import { DataBaseRepository } from '../external/database/repository/database-repository';

@Injectable()
export class WorkoutPlanService implements WorkoutPlanRepository {
  constructor(private readonly dataBase: DataBaseRepository) {}

  createWorkoutPlan(): void {
    throw new Error('Method not implemented.');
  }

  getWorkoutPlan(): void {
    this.dataBase.get();
  }
}
