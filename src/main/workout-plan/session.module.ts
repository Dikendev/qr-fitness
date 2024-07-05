import { Module } from '@nestjs/common';
import { SessionService } from './session-prisma.service';
import { SessionController } from './session.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { SessionRepository } from './repository/session-repository';

@Module({
  imports: [PrismaModule],
  providers: [
    SessionService,
    { provide: SessionRepository, useClass: SessionService },
  ],
  controllers: [SessionController],
  exports: [SessionRepository],
})
export class SessionModule {}
