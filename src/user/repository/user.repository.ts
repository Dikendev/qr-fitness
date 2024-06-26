import { CreateUserDto, UserResponse } from '../model/user.model';

export abstract class UserRepository {
  abstract create(body: CreateUserDto): Promise<UserResponse>;
  abstract list(): Promise<UserResponse[]>;
  abstract findById(id: string): Promise<UserResponse>;
  abstract delete(id: string): Promise<string>;
}
