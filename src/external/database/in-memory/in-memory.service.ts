import { Injectable } from '@nestjs/common';
import { DataBaseRepository } from '../repository/database-repository';

@Injectable()
export class InMemoryService implements DataBaseRepository {
  dataBase: any[] = [];

  constructor() {}

  create(data: any): void {
    this.dataBase.push(data);
  }

  get(): void {
    this.dataBase.forEach((data) => {
      console.log(data);
    });
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
