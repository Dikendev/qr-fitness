export abstract class DataBaseRepository {
  abstract create(data: any): void;
  abstract get(): void;
  abstract update(): void;
  abstract delete(): void;
  abstract list(): void;
}
