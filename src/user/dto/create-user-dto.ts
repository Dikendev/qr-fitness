import { z } from 'zod';

const UserSchema = z.object({
  email: z
    .string({ message: 'Need inform a email' })
    .email({ message: 'Invalid email' }),
  name: z.string({ message: 'Need inform a name' }),
  password: z.string({ message: 'Need inform a password' }),
});

export type CreateUserDto = z.infer<typeof UserSchema>;
