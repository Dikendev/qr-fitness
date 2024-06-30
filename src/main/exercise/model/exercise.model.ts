import { z } from 'zod';

export interface Exercise {
  id?: string;
  name: string;
  description: string;
  sets: number;
  reps: number;
  createdAt?: Date;
  updatedAt?: Date;
  workoutId?: string;
}

export const ExerciseSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  sets: z.number(),
  reps: z.number(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  workoutId: z.string().optional(),
});

export const CreateExerciseSchema = ExerciseSchema.pick({
  name: true,
  description: true,
  sets: true,
  reps: true,
  workoutId: true,
});

export type CreateExerciseDto = z.infer<typeof CreateExerciseSchema>;
export type UpdateExerciseDto = z.infer<typeof CreateExerciseSchema>;
export type ExerciseResponse = z.infer<typeof ExerciseSchema>;
