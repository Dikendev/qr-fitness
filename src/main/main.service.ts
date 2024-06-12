import { Injectable } from '@nestjs/common';

@Injectable()
export class MainService {
  constructor() {}

  main(): string {
    return 'Hello World!';
  }
}
