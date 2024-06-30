import {
  CreateExerciseDto,
  ExerciseResponse,
  UpdateExerciseDto,
} from '../model/exercise.model';

export abstract class ExerciseRepository {
  abstract create(body: CreateExerciseDto): Promise<ExerciseResponse>;
  abstract findById(id: string): Promise<ExerciseResponse>;
  abstract list(): Promise<ExerciseResponse[]>;
  abstract update(
    id: string,
    body: UpdateExerciseDto,
  ): Promise<ExerciseResponse>;
  abstract delete(id: string): Promise<string>;
}
