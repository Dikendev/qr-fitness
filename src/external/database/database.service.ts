import { Injectable } from '@nestjs/common';
import { DataBaseRepository } from './repository/database-repository';

export interface InMemoryData {
  [key: string]: any;
}

export type InMemoryDataResponseType = InMemoryData | string;

@Injectable()
export class DatabaseService implements DataBaseRepository {
  inMemoryDatabase: InMemoryData[] = [];
  constructor() {}

  create(data: InMemoryData): void {
    this.inMemoryDatabase.push(data);
  }

  get(key: string): InMemoryDataResponseType {
    const assignNewData = Object.assign({}, ...this.inMemoryDatabase);
    const keys = Object.keys(assignNewData);
    const result = keys.find((data) => data === key);

    if (!result) {
      return 'Key not found';
    }

    return this.inMemoryDatabase[0];
  }

  update(key: string, data: InMemoryData): void {
    throw new Error('Method not implemented.');
  }
  delete(): void {
    throw new Error('Method not implemented.');
  }
  list(): void {
    throw new Error('Method not implemented.');
  }
}
