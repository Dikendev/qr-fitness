import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { prismaErrorGenerate } from './prisma-error-generate';

const PRISMA_ERRORS = prismaErrorGenerate();

@Catch()
export class PrismaClientExceptionFilter
  extends BaseExceptionFilter
  implements ExceptionFilter
{
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = this.shortMessage(exception.message);

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      if (PRISMA_ERRORS[exception.code]) {
        const status = HttpStatus.CONFLICT;
        response.status(status).json({
          statusCode: status,
          message,
        });

        return status;
      }
    }

    if (
      exception instanceof Error &&
      exception instanceof Prisma.PrismaClientValidationError
    ) {
      response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: this.shortMessagePrismaErrors(exception.message),
      });
    }

    super.catch(exception, host);
  }

  private shortMessagePrismaErrors(message: string): string {
    const regex = /Argument\s(.*)/;
    const match = message.match(regex);
    if (match) {
      return match[1];
    } else {
      return 'No match found';
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
