import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from '../model/create-user-dto';
import { UserResponse } from '../model/user.response';
import { UserPrismaService } from '../user-prisma.service';

const prismaRepositoryMock = {
  create: jest.fn(),
  list: jest.fn(),
};

describe('UserService', () => {
  let userService: UserPrismaService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserPrismaService,
        PrismaService,
        { provide: UserPrismaService, useValue: prismaRepositoryMock },
      ],
    }).compile();

    userService = module.get<UserPrismaService>(UserPrismaService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should userService be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should prisma be defined', () => {
    expect(prismaService).toBeDefined();
  });

  it('should create a user with success', async () => {
    const user: CreateUserDto = {
      name: 'Diego',
      email: 'diego@gmail.com',
      password: `123`,
    };

    jest.spyOn(userService, 'create').mockResolvedValue({
      id: '1',
      name: user.name,
      email: user.email,
    });

    const userCreated = await userService.create(user);

    const userExpected: UserResponse = {
      id: expect.any(String),
      name: user.name,
      email: user.email,
    };

    expect(userCreated).toEqual(userExpected);
  });

  it('should list all users with success', async () => {
    const listUser = jest.spyOn(userService, 'list').mockResolvedValue([
      {
        id: '1',
        name: 'Diego',
        email: 'Diego@gmail.com',
      },
      {
        id: '2',
        name: 'Cristina',
        email: 'Cristina@gmail.com',
      },
    ]);

    const users = await userService.list();

    expect(listUser).toHaveBeenCalledTimes(1);
    expect(users).toHaveLength(2);
  });

  it('should throw an error when trying to create a user with an email already registered', async () => {
    const user: CreateUserDto = {
      name: 'Diego',
      email: 'Diego@gmail.com',
      password: '123',
    };

    jest
      .spyOn(userService, 'create')
      .mockRejectedValue(new Error('Email already registered'));

    await expect(userService.create(user)).rejects.toBeInstanceOf(Error);
  });
});
