import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSessionDto, SessionResponse } from './model/workout-plan-dto';
import { SessionRepository } from './repository/session-repository';

@Injectable()
export class SessionService implements SessionRepository {
  exerciseSelect = {
    select: {
      id: true,
      name: true,
      description: true,
      sets: true,
      reps: true,
      updatedAt: true,
      createdAt: true,
    },
  };

  sessionSelect = {
    select: {
      id: true,
      name: true,
      description: true,
      workoutType: true,
      exercises: this.exerciseSelect,
      createdAt: true,
      updatedAt: true,
    },
  };

  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateSessionDto): Promise<SessionResponse> {
    try {
      const session = await this.prisma.$transaction(async (prisma) => {
        const connectExercises = body.exercises
          ?.filter((exercise) => exercise.id)
          .map((exercise) => ({ id: exercise.id }));

        const exercisesBulk = body.exercises?.map((exercise) => {
          return {
            where: { id: exercise.id ?? '' },
            create: {
              name: exercise.name ?? '',
              description: exercise.description ?? '',
              sets: exercise.sets ?? 0,
              reps: exercise.reps ?? 0,
            },
          };
        });

        const session = await prisma.session.create({
          data: {
            name: body.name,
            description: body.description,
            sessionGroup: body.workoutType,
            exercises: {
              connect: connectExercises,
              connectOrCreate: exercisesBulk,
            },
          },
          select: this.sessionSelect.select,
        });

        return session;
      });

      return session;
    } catch (error) {
      throw new Error('Failed to create session');
    }
  }

  async list(): Promise<SessionResponse[]> {
    try {
      const session = this.prisma.session.findMany({
        select: this.sessionSelect.select,
      });

      if (!session) {
        throw new Error('No session found');
      }

      return session;
    } catch (error) {
      throw new Error();
    }
  }

  async findById(id: string): Promise<SessionResponse> {
    const session = await this.prisma.session.findUnique({
      where: { id },
      select: this.sessionSelect.select,
    });

    if (!session) {
      throw new Error('Session not found');
    }

    return session;
  }

  async delete(id: string): Promise<string> {
    try {
      await this.prisma.session.delete({
        where: { id },
      });

      return `Session id: ${id} deleted`;
    } catch (error) {
      throw new Error('Failed to delete session');
    }
  }
}
