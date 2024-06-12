import { Module } from '@nestjs/common';
import { WorkoutPlanService } from './workout-plan.service';
import { WorkoutPlanController } from './workout-plan.controller';
import { WorkoutPlanRepository } from './repository/workout-plan-repository';
import { DatabaseModule } from '../external/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    WorkoutPlanService,
    { provide: WorkoutPlanRepository, useClass: WorkoutPlanService },
  ],
  controllers: [WorkoutPlanController],
  exports: [WorkoutPlanRepository],
})
export class WorkoutPlanModule {}
