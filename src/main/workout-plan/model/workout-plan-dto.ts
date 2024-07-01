import { z } from 'zod';
import { ExerciseSchema } from '../../exercise/model/exercise.model';

export const WorkoutPlanSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  workoutType: z.string(),
  exercises: z.array(ExerciseSchema).optional(),
  userId: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const WorkoutPlanCreateSchema = WorkoutPlanSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateWorkoutPlanDto = z.infer<typeof WorkoutPlanCreateSchema>;
export type WorkoutPlanResponse = z.infer<typeof WorkoutPlanSchema>;
