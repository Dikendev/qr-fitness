import { z } from 'zod';
import { Exercise, ExerciseSchema } from '../../exercise/model/exercise.model';

export interface WorkoutPlan {
  id?: string;
  name: string;
  description: string;
  workoutType: string;
  userId?: string;
  exercises?: Exercise[];
  createdAt?: Date;
  updatedAt?: Date;
}

export const WorkoutPlanSchema: z.ZodSchema<WorkoutPlan> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  workoutType: z.string(),
  exercises: z.array(ExerciseSchema).optional(),
  userId: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type WorkoutPlanDto = z.infer<typeof WorkoutPlanSchema>;
