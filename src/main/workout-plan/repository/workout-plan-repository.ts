import {
  CreateWorkoutPlanDto,
  WorkoutPlanResponse,
} from '../model/workout-plan-dto';

export abstract class WorkoutPlanRepository {
  abstract create(body: CreateWorkoutPlanDto): Promise<WorkoutPlanResponse>;
  abstract list(): Promise<WorkoutPlanResponse[]>;
  abstract findById(id: string): Promise<WorkoutPlanResponse>;
  abstract delete(id: string): Promise<string>;
}
