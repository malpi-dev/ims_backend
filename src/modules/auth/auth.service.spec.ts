import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { User } from './schemas/user.schema';
import { Person } from './schemas/person.schema';
import { RefreshToken } from './schemas/refresh-token.schema';

describe('AuthService', () => {
  let service: AuthService;

  const mockUserModel = {
    findOne: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
  };
  const mockPersonModel = { create: jest.fn(), findOne: jest.fn() };
  const mockRefreshTokenModel = {
    create: jest.fn(),
    findOne: jest.fn(),
    updateMany: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getModelToken(User.name), useValue: mockUserModel },
        { provide: getModelToken(Person.name), useValue: mockPersonModel },
        { provide: getModelToken(RefreshToken.name), useValue: mockRefreshTokenModel },
        { provide: JwtService, useValue: { signAsync: jest.fn(), verifyAsync: jest.fn() } },
        { provide: ConfigService, useValue: { get: jest.fn() } },
      ],
    }).compile();

    service = moduleRef.get(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
