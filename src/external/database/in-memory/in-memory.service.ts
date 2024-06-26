import { BadGatewayException, Injectable } from '@nestjs/common';
import { DataBaseRepository } from '../repository/database-repository';
import { InMemoryData, InMemoryDataResponseType } from '../database.service';

@Injectable()
export class InMemoryService implements DataBaseRepository {
  dataBase: InMemoryData[] = [];

  constructor() {}

  create(data: any): void {
    this.dataBase.push(data);
  }

  get(key: string): InMemoryDataResponseType {
    this.dataBase.forEach((data) => {
      if (data.key === key) {
        return data;
      }
    });

    throw new BadGatewayException('Data not found');
  }

  update(): void {
    throw new Error('Method not implemented.');
  }

  delete(): void {
    throw new Error('Method not implemented.');
  }

  list(): void {
    throw new Error('Method not implemented.');
  }
}
