import { z, ZodError } from 'zod';
import { ZodPipe } from './zod.pipe';
import { CreateUserDto } from '../../main/user/model/user.model';

describe('ZodPipe', () => {
  let zodPipe: ZodPipe;

  const mockSchema = z.object({
    name: z.string(),
    email: z.string().email(),
  });

  beforeEach(() => {
    zodPipe = new ZodPipe(mockSchema);
  });

  it('should be defined', () => {
    expect(new ZodPipe(mockSchema)).toBeDefined();
  });

  it('should return correctly when value is valid', () => {
    const testData = { name: 'John Doe', email: 'diego@gmail.com' };

    const result = () => zodPipe.transform(testData, { type: 'body' });
    expect(result).not.toThrow();
  });

  it('should throw an error when email is invalid', () => {
    const testData: CreateUserDto = {
      name: 'John Doe',
      email: 'invalid-email',
      password: '12345678',
    };

    try {
      (() =>
        zodPipe.transform(testData, {
          type: 'body',
        }))();
    } catch (error: any) {
      expect(error).toBeInstanceOf(ZodError);
      expect(error.errors[0].message).toBe('Invalid email');
    }
  });
});
