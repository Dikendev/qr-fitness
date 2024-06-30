import { Module } from '@nestjs/common';
import { DatabaseModule } from './external/database/database.module';
import { QrCodeModule } from './external/qr-code/qr-code.module';
import { MainModule } from './main/main.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { ExerciseModule } from './main/exercise/exercise.module';
import { UserPrismaService } from './main/user/user-prisma.service';
import { UserModule } from './main/user/user.module';
import { WorkoutPlanModule } from './main/workout-plan/workout-plan.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    WorkoutPlanModule,
    DatabaseModule,
    QrCodeModule,
    MainModule,
    UserModule,
    ExerciseModule,
  ],
  providers: [UserPrismaService, PrismaService],
})
export class AppModule {}
