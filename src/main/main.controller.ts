import { Controller, Get } from '@nestjs/common';
import { MainService } from './main.service';

@Controller('main')
export class MainController {
  constructor(private readonly mainService: MainService) {}

  @Get()
  main(): string {
    return this.mainService.main();
  }
}
