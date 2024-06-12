import { Module } from '@nestjs/common';
import { WorkoutPlanModule } from './workout-plan/workout-plan.module';
import { DatabaseModule } from './external/database/database.module';
import { QrCodeModule } from './external/qr-code/qr-code.module';
import { MainModule } from './main/main.module';

@Module({
  imports: [WorkoutPlanModule, DatabaseModule, QrCodeModule, MainModule],
})
export class AppModule {}
