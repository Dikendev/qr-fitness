import { CreateUserDto } from '../dto/create-user-dto';
import { UserResponse } from '../model/user.response';

export abstract class UserRepository {
  abstract create(body: CreateUserDto): Promise<UserResponse>;
  abstract list(): Promise<UserResponse[]>;
}
