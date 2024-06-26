import { Module } from '@nestjs/common';
import { WorkoutPlanService } from './workout-plan-prisma.service';
import { WorkoutPlanController } from './workout-plan.controller';
import { WorkoutPlanRepository } from './repository/workout-plan-repository';
import { DatabaseModule } from '../external/database/database.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [DatabaseModule, PrismaModule],
  providers: [
    WorkoutPlanService,
    { provide: WorkoutPlanRepository, useClass: WorkoutPlanService },
  ],
  controllers: [WorkoutPlanController],
  exports: [WorkoutPlanRepository],
})
export class WorkoutPlanModule {}
