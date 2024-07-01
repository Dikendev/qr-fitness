import { Module } from '@nestjs/common';
import { WorkoutPlanService } from './workout-plan-prisma.service';
import { WorkoutPlanController } from './workout-plan.controller';
import { WorkoutPlanRepository } from './repository/workout-plan-repository';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    WorkoutPlanService,
    { provide: WorkoutPlanRepository, useClass: WorkoutPlanService },
  ],
  controllers: [WorkoutPlanController],
  exports: [WorkoutPlanRepository],
})
export class WorkoutPlanModule {}
