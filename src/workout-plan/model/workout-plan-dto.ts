import { z } from 'zod';
import { UserSchema } from '../../user/model/user.model';
import { ExerciseSchema } from '../../exercice/model/model.model';

export const WorkoutPlanSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  description: z.string(),
  workoutType: z.string(),
  exercises: z.array(ExerciseSchema).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string().optional(),
});

export type WorkoutPlantDto = z.infer<typeof WorkoutPlanSchema>;
