import { z } from 'zod';
import { SessionSchema } from '../../workout-plan/model/workout-plan-dto';

export const UserSchema = z.object({
  id: z.string().cuid().optional(),
  email: z
    .string({ message: 'Need inform a email' })
    .email({ message: 'Invalid email' })
    .max(255)
    .trim(),
  name: z.string({ message: 'Need inform a name' }).trim().min(3).max(255),
  password: z.string({ message: 'Need inform a password' }).min(6).max(255),
  workouts: z.array(SessionSchema).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const CreateUserSchema = UserSchema.pick({
  email: true,
  name: true,
  workouts: true,
  password: true,
});

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
