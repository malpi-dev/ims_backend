import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ProductsService } from './products.service';
import { Product } from '../schemas/product.schema';
import { ProductAttributeValue } from '../schemas/product-attribute-value.schema';
import { ProductTypeAttribute } from '../schemas/product-type-attribute.schema';
import { Attribute } from '../schemas/attribute.schema';
import { AttributeOption } from '../schemas/attribute-option.schema';
import { ProductPart } from '../schemas/product-part.schema';

describe('ProductsService', () => {
  let service: ProductsService;

  const mockModel = {
    findOne: jest.fn(),
    findById: jest.fn(),
    find: jest.fn().mockReturnValue({
      populate: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      sort: jest.fn().mockResolvedValue([]),
    }),
    countDocuments: jest.fn(),
    create: jest.fn(),
    findOneAndUpdate: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: getModelToken(Product.name), useValue: mockModel },
        { provide: getModelToken(ProductAttributeValue.name), useValue: mockModel },
        { provide: getModelToken(ProductTypeAttribute.name), useValue: mockModel },
        { provide: getModelToken(Attribute.name), useValue: mockModel },
        { provide: getModelToken(AttributeOption.name), useValue: mockModel },
        { provide: getModelToken(ProductPart.name), useValue: mockModel },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
