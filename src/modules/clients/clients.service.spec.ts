import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Client } from './schemas/client.schema';
import { Area } from './schemas/area.schema';

describe('ClientsService', () => {
  let service: ClientsService;

  const mockClientModel = {
    findById: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    countDocuments: jest.fn(),
    find: jest.fn().mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      sort: jest.fn().mockResolvedValue([]),
    }),
  };

  const mockAreaModel = {
    findOne: jest.fn(),
    create: jest.fn(),
    countDocuments: jest.fn(),
    find: jest.fn().mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      sort: jest.fn().mockResolvedValue([]),
    }),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ClientsService,
        { provide: getModelToken(Client.name), useValue: mockClientModel },
        { provide: getModelToken(Area.name), useValue: mockAreaModel },
      ],
    }).compile();

    service = moduleRef.get(ClientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a client', async () => {
      const dto = { name: 'Test Client', code: 'TC001', status: 'active' };
      mockClientModel.create.mockResolvedValueOnce(dto);
      const result = await service.create(dto);
      expect(result).toEqual(dto);
    });
  });

  describe('findOne', () => {
    it('should throw NotFoundException when client does not exist', async () => {
      mockClientModel.findById.mockResolvedValueOnce(null);
      await expect(service.findOne('nonexistent')).rejects.toThrow(NotFoundException);
    });

    it('should return client when found', async () => {
      const client = { _id: 'some-id', name: 'Test' };
      mockClientModel.findById.mockResolvedValueOnce(client);
      const result = await service.findOne('some-id');
      expect(result).toEqual(client);
    });
  });

  describe('remove', () => {
    it('should soft delete a client', async () => {
      const saveFn = jest.fn().mockResolvedValueOnce({});
      const mockDoc = { _id: 'some-id', deletedAt: undefined, save: saveFn };
      mockClientModel.findOne.mockResolvedValueOnce(mockDoc);

      const result = await service.remove('some-id');
      expect(saveFn).toHaveBeenCalled();
      expect(mockDoc.deletedAt).toBeInstanceOf(Date);
      expect(result.data).toBe(true);
    });
  });

  describe('areas', () => {
    it('should create an area', async () => {
      const dto = { name: 'IT Area', code: 'IT' };
      mockAreaModel.create.mockResolvedValueOnce({ ...dto, clientId: 'client-id' });
      const result = await service.createArea('client-id', dto);
      expect(result).toMatchObject({ clientId: 'client-id' });
    });

    it('should throw NotFoundException when area not found', async () => {
      mockAreaModel.findOne.mockResolvedValueOnce(null);
      await expect(service.getArea('client-id', 'area-id')).rejects.toThrow(NotFoundException);
    });

    it('should return area when found', async () => {
      const area = { _id: 'area-id', clientId: 'client-id', name: 'IT' };
      mockAreaModel.findOne.mockResolvedValueOnce(area);
      const result = await service.getArea('client-id', 'area-id');
      expect(result).toEqual(area);
    });
  });
});
