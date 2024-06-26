import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { prismaErrorGenerate } from './prisma-error-generate';

const PRISMA_ERRORS = prismaErrorGenerate();

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = this.shortMessage(exception.message);

    if (PRISMA_ERRORS[exception.code]) {
      const status = HttpStatus.CONFLICT;
      response.status(status).json({
        statusCode: status,
        message,
      });

      return status;
    } else {
      super.catch(exception, host);
    }
  }

  private shortMessage(message: string): string {
    const shortMessage = message.substring(message.indexOf('→'));

    return shortMessage
      .substring(shortMessage.indexOf('\n'))
      .replace(/\n/g, '')
      .trim();
  }
}
