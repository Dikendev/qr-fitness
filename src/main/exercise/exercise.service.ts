import { BadRequestException, Injectable } from '@nestjs/common';
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

      if (!exercise) {
        throw new BadRequestException('Exercise not created');
      }

      return exercise;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findById(id: string): Promise<ExerciseResponse> {
    try {
      const exercise = await this.prismaService.exercise.findUnique({
        where: { id },
        select: this.exercisesSelectResponse.select,
      });

      if (!exercise) {
        throw new BadRequestException('Exercise not found');
      }

      return exercise;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async list(): Promise<ExerciseResponse[]> {
    try {
      const exerciseList = await this.prismaService.exercise.findMany({
        select: this.exercisesSelectResponse.select,
      });

      if (!exerciseList) {
        throw new BadRequestException('Exercise list not found');
      }

      return exerciseList;
    } catch (error) {
      throw new BadRequestException();
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
        throw new BadRequestException('Exercise not updated');
      }

      return exercise;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async delete(id: string): Promise<string> {
    try {
      const exercise = await this.prismaService.exercise.delete({
        where: { id },
        select: { id: true, name: true },
      });

      if (!exercise) {
        throw new BadRequestException('Exercise not found');
      }

      return `Exercise id: ${id} - name: ${exercise.name} deleted successfully`;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
