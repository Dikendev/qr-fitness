import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SessionRepository } from './repository/session-repository';
import {
  CreateSessionDto,
  SessionCreateSchema,
  SessionResponse,
} from './model/workout-plan-dto';
import { ZodPipe } from '../../pipe/zod/zod.pipe';

@Controller('workout-plan')
export class SessionController {
  constructor(private readonly sessionRepository: SessionRepository) {}

  @Post()
  async create(
    @Body(new ZodPipe(SessionCreateSchema))
    body: CreateSessionDto,
  ): Promise<SessionResponse> {
    return this.sessionRepository.create(body);
  }

  @Get('list')
  async list(): Promise<SessionResponse[]> {
    return this.sessionRepository.list();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<SessionResponse> {
    return this.sessionRepository.findById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<string> {
    return this.sessionRepository.delete(id);
  }
}
