import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { z } from 'zod';

@Injectable()
export class ZodPipe implements PipeTransform {
  constructor(private readonly schema: z.Schema) {}
  transform(value: any, metadata: ArgumentMetadata) {
    const safeParse = this.schema.safeParse(value);

    if (!safeParse.success) {
      throw new BadRequestException(safeParse.error.errors[0]);
    }
    return value;
  }
}
