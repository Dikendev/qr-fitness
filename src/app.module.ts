import { Module } from '@nestjs/common';
import { WorkoutPlanModule } from './workout-plan/workout-plan.module';
import { DatabaseModule } from './external/database/database.module';
import { QrCodeModule } from './external/qr-code/qr-code.module';
import { MainModule } from './main/main.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { UserPrismaService } from './user/user-prisma.service';
import { ExerciseModule } from './exercise/exercise.module';

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
