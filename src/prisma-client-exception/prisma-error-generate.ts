import { PrismaErrorDictionary } from './prisma-error-dictionary';

export const prismaErrorGenerate = (): PrismaErrorDictionary => {
  const prismaErrorDictionary: PrismaErrorDictionary = {};
  for (let i = 1; i <= 36; i++) {
    const indexPlusOne = i + 1;
    const key = i >= 9 ? `P20${indexPlusOne}` : `P200${indexPlusOne}`;
    prismaErrorDictionary[key] = key;
  }

  return prismaErrorDictionary;
};
