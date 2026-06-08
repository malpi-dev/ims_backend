import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../auth/schemas/user.schema';
import { Person } from '../auth/schemas/person.schema';

describe('UsersService', () => {
  let service: UsersService;

  const mockQuery = {
    select: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    sort: jest.fn().mockResolvedValue([]),
  };

  const mockUserModel = {
    findOne: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    countDocuments: jest.fn(),
    find: jest.fn().mockReturnValue(mockQuery),
  };

  const mockPersonModel = {
    create: jest.fn(),
  };

  function mockFindOneQuery(result: any) {
    return { select: jest.fn().mockResolvedValue(result) };
  }

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getModelToken(User.name), useValue: mockUserModel },
        { provide: getModelToken(Person.name), useValue: mockPersonModel },
      ],
    }).compile();

    service = moduleRef.get(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should throw BadRequestException when email already exists', async () => {
      mockUserModel.findOne.mockResolvedValueOnce({ _id: 'existing' });
      await expect(
        service.create({ email: 'test@test.com', password: '123456', role: 'user' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should create user and person', async () => {
      mockUserModel.findOne.mockResolvedValueOnce(null);
      mockUserModel.create.mockResolvedValueOnce({ _id: 'new-id', email: 'test@test.com', role: 'user' });
      mockPersonModel.create.mockResolvedValueOnce({});
      mockUserModel.findById.mockReturnValueOnce(mockFindOneQuery({ _id: 'new-id', email: 'test@test.com', role: 'user' }));

      const result = await service.create({ email: 'test@test.com', password: '123456', role: 'user' });
      expect(result).toBeDefined();
      expect(mockPersonModel.create).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return paginated results', async () => {
      mockUserModel.countDocuments.mockResolvedValueOnce(10);
      mockUserModel.find().select().skip().limit().sort.mockResolvedValueOnce([]);

      const result = await service.findAll({ page: 1, limit: 20 });
      expect(result.meta.total).toBe(10);
      expect(result.meta.totalPages).toBe(1);
    });
  });

  describe('updateStatus', () => {
    it('should throw ForbiddenException when banning self', async () => {
      await expect(
        service.updateStatus('same-id', 'same-id', { status: 'banned' }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should throw NotFoundException for non-existing user', async () => {
      mockUserModel.findOne.mockReturnValueOnce(mockFindOneQuery(null));
      await expect(
        service.updateStatus('admin-id', 'non-existing', { status: 'banned' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('softDelete', () => {
    it('should throw NotFoundException for non-existing user', async () => {
      mockUserModel.findOne.mockResolvedValueOnce(null);
      await expect(service.softDelete('non-existing')).rejects.toThrow(NotFoundException);
    });

    it('should set deletedAt on existing user', async () => {
      const saveFn = jest.fn().mockResolvedValueOnce({});
      const mockDoc = { _id: 'existing', deletedAt: undefined, save: saveFn };
      mockUserModel.findOne.mockResolvedValueOnce(mockDoc);

      const result = await service.softDelete('existing');
      expect(saveFn).toHaveBeenCalled();
      expect(mockDoc.deletedAt).toBeInstanceOf(Date);
      expect(result.data).toBe(true);
    });
  });
});
