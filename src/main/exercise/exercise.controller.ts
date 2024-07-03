import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ExerciseRepository } from './repository/exercise.repository';
import {
  CreateExerciseDto,
  CreateExerciseSchema,
  ExerciseResponse,
} from './model/exercise.model';
import { ZodPipe } from '../../pipe/zod/zod.pipe';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseRepository: ExerciseRepository) {}

  @Post()
  async create(
    @Body(new ZodPipe(CreateExerciseSchema)) body: CreateExerciseDto,
  ): Promise<ExerciseResponse> {
    return this.exerciseRepository.create(body);
  }

  @Get('list')
  async list(): Promise<ExerciseResponse[]> {
    return this.exerciseRepository.list();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ExerciseResponse> {
    return this.exerciseRepository.findById(id);
  }

  @Patch(':id')
  async update(
    @Param() param: { id: string },
    @Body() body: CreateExerciseDto,
  ): Promise<ExerciseResponse> {
    return this.exerciseRepository.update(param.id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<string> {
    return this.exerciseRepository.delete(id);
  }
}
