import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UserRepository } from './repository/user.repository';
import { UserPrismaService } from './user-prisma.service';
import { UserController } from './user.controller';

@Module({
  imports: [PrismaModule],
  providers: [
    UserPrismaService,
    { provide: UserRepository, useClass: UserPrismaService },
  ],
  controllers: [UserController],
  exports: [UserRepository],
})
export class UserModule {}
