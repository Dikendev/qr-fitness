import { prismaErrorGenerate } from '../prisma-error-generate';

describe('prismaErrorGenerate', () => {
  it('should generate a dictionary with 36 keys', () => {
    const dictionary = prismaErrorGenerate();
    const keys = Object.keys(dictionary);

    expect(keys.length).toBe(36);
    expect(keys[0]).toBe('P2002');
    expect(keys[8]).toBe('P2010');
    expect(keys[35]).toBe('P2037');
  });
});
