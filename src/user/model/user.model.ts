import { z } from 'zod';
import { WorkoutPlanSchema } from '../../workout-plan/model/workout-plan-dto';

export const UserSchema = z.object({
  id: z.string().cuid(),
  email: z
    .string({ message: 'Need inform a email' })
    .trim()
    .email({ message: 'Invalid email' }),
  name: z.string({ message: 'Need inform a name' }).trim().min(3).max(255),
  password: z.string({ message: 'Need inform a password' }).min(6).max(255),
  workouts: z.array(WorkoutPlanSchema).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateUserSchema = UserSchema.pick({
  email: true,
  name: true,
  password: true,
}).partial();

const UserResponseSchema = UserSchema.omit({
  password: true,
});

const UpdateUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial();

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
export type UserResponse = z.infer<typeof UserResponseSchema>;
