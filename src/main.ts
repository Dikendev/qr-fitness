import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';
import { ZodFilter } from './filter/zod/zod.filter';
import { ExceptionHandleFilter } from './filter/exception/exception-handle.filter';

const PORT = process.env.PORT || 3000;

(async () => {
  const app = await NestFactory.create(AppModule);
  const logger = Logger;
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(
    new ZodFilter(),
    new PrismaClientExceptionFilter(httpAdapter),
    new ExceptionHandleFilter(),
  );

  app.setGlobalPrefix('api');

  await app.listen(PORT, () => {
    logger.log(`Listening on: ${PORT}`, 'Bootstrap');
  });
})();
