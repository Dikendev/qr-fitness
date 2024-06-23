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
    this.schema.parse(value);
  }
}
