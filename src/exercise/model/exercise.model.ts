import { z } from 'zod';

export const ExerciseSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  description: z.string(),
  sets: z.number(),
  reps: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  workoutId: z.string().optional(),
});

export type Exercise = z.infer<typeof ExerciseSchema>;
