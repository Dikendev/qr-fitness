import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryService } from './in-memory.service';

describe('InMemoryService', () => {
  let service: InMemoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InMemoryService],
    }).compile();

    service = module.get<InMemoryService>(InMemoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create successfully', () => {
    const data = { name: 'test' };

    service.create(data);
    console.log(service.dataBase);

    expect(service.dataBase).toContainEqual(data);
  });
});
