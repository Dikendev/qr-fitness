import { InMemoryData, InMemoryDataResponseType } from '../database.service';

export abstract class DataBaseRepository {
  abstract create(data: any): void;
  abstract get(key: string): InMemoryDataResponseType;
  abstract update(key: string, data: InMemoryData): void;
  abstract delete(): void;
  abstract list(): void;
}
