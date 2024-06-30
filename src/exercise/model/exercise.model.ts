import { z } from 'zod';

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

export type Exercise = z.infer<typeof ExerciseSchema>;
export type CreateExerciseDto = Omit<
  Exercise,
  'id' | 'createdAt' | 'updatedAt'
>;
