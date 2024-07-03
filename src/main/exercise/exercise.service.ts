import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ExerciseRepository } from './repository/exercise.repository';
import {
  CreateExerciseDto,
  ExerciseResponse,
  UpdateExerciseDto,
} from './model/exercise.model';

@Injectable()
export class ExerciseService implements ExerciseRepository {
  exercisesSelectResponse = {
    select: {
      id: true,
      name: true,
      description: true,
      sets: true,
      reps: true,
      createdAt: true,
      updatedAt: true,
    },
  };

  constructor(private readonly prismaService: PrismaService) {}

  async create(body: CreateExerciseDto): Promise<ExerciseResponse> {
    try {
      const exercise = await this.prismaService.exercise.create({
        data: body,
        select: this.exercisesSelectResponse.select,
      });

      return exercise;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<ExerciseResponse> {
    try {
      const exercise = await this.prismaService.exercise.findUnique({
        where: { id },
        select: this.exercisesSelectResponse.select,
      });

      if (!exercise) {
        throw new HttpException('Exercise not found', HttpStatus.NOT_FOUND);
      }

      return exercise;
    } catch (error) {
      throw error;
    }
  }

  async list(): Promise<ExerciseResponse[]> {
    try {
      const exerciseList = await this.prismaService.exercise.findMany({
        select: this.exercisesSelectResponse.select,
      });

      if (!exerciseList) {
        throw new HttpException(
          'Exercise list not found',
          HttpStatus.NOT_FOUND,
        );
      }

      return exerciseList;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, body: UpdateExerciseDto): Promise<ExerciseResponse> {
    try {
      const exercise = await this.prismaService.exercise.update({
        where: { id },
        data: body,
        select: this.exercisesSelectResponse.select,
      });

      if (!exercise) {
        throw new HttpException(
          'Exercise not updated',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      return exercise;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<string> {
    try {
      const exercise = await this.prismaService.exercise.delete({
        where: { id },
        select: { id: true, name: true },
      });

      if (!exercise) {
        throw new HttpException('Exercise not found', HttpStatus.NOT_FOUND);
      }

      return `Exercise id: ${id} - name: ${exercise.name} deleted successfully`;
    } catch (error) {
      throw error;
    }
  }
}
