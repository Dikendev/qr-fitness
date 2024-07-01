import { Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ExerciseController } from './exercise.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { ExerciseRepository } from './repository/exercise.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    ExerciseService,
    { provide: ExerciseRepository, useClass: ExerciseService },
  ],
  controllers: [ExerciseController],
  exports: [ExerciseRepository],
})
export class ExerciseModule {}
