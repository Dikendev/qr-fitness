import { z } from 'zod';
import { ExerciseSchema } from '../../exercise/model/exercise.model';

export const SessionSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  workoutType: z.string(),
  exercises: z.array(ExerciseSchema).optional(),
  userId: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const SessionCreateSchema = SessionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateSessionDto = z.infer<typeof SessionCreateSchema>;
export type SessionResponse = z.infer<typeof SessionSchema>;
