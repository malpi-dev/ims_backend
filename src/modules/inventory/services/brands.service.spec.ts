import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { BrandsService } from './brands.service';
import { Brand } from '../schemas/brand.schema';

describe('BrandsService', () => {
  let service: BrandsService;

  const mockModel = {
    create: jest.fn(),
    countDocuments: jest.fn(),
    find: jest.fn().mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      sort: jest.fn().mockResolvedValue([]),
    }),
    findById: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrandsService,
        { provide: getModelToken(Brand.name), useValue: mockModel },
      ],
    }).compile();

    service = module.get<BrandsService>(BrandsService);
  });

  it('should create a brand', async () => {
    mockModel.create.mockResolvedValue({ name: 'HP' });
    const result = await service.create({ name: 'HP', code: 'HP' });
    expect(result).toEqual({ name: 'HP' });
  });
});
