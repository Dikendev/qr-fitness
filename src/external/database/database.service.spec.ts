import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database.service';

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new data in memory', () => {
    const data = { name: 'John Doe' };
    service.create(data);
    expect(service.inMemoryDatabase).toEqual([data]);
  });

  it('should get a data from memory', () => {
    const data = { name: 'John Doe' };
    service.create(data);

    const readData = service.get('name');
    expect(readData).toEqual(data);
  });

  it('should return a message if key is not found', () => {
    const data = { name: 'John Doe' };
    service.create(data);
    const readData = service.get('date');
    expect(readData).toEqual('Key not found');
  });

  it('should return only a key and value from memory', () => {
    const data1 = { name: 'John Doe', age: 30 };
    const data2 = { date: '23/05/95', location: 'Nigeria' };
    service.create(data1);
    service.create(data2);

    const readData = service.get('name');
    expect(readData).toEqual(data1);
  });
});
