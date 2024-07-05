import { CreateSessionDto, SessionResponse } from '../model/workout-plan-dto';

export abstract class SessionRepository {
  abstract create(body: CreateSessionDto): Promise<SessionResponse>;
  abstract list(): Promise<SessionResponse[]>;
  abstract findById(id: string): Promise<SessionResponse>;
  abstract delete(id: string): Promise<string>;
}
