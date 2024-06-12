import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { InMemoryService } from './in-memory/in-memory.service';
import { DataBaseRepository } from './repository/database-repository';

@Module({
  providers: [
    InMemoryService,
    DatabaseService,
    { provide: DataBaseRepository, useClass: InMemoryService },
  ],
  exports: [DataBaseRepository],
})
export class DatabaseModule {}
