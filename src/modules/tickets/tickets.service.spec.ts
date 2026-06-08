import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { TicketsService } from './tickets.service';
import { Ticket } from './schemas/ticket.schema';
import { TicketProblemType } from './schemas/ticket-problem-type.schema';
import { Product } from '../inventory/schemas/product.schema';

describe('TicketsService', () => {
  let service: TicketsService;

  const mockModel = {
    findOne: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    countDocuments: jest.fn(),
    find: jest.fn().mockReturnValue({
      populate: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      sort: jest.fn().mockResolvedValue([]),
    }),
    aggregate: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TicketsService,
        { provide: getModelToken(Ticket.name), useValue: mockModel },
        { provide: getModelToken(TicketProblemType.name), useValue: mockModel },
        { provide: getModelToken(Product.name), useValue: mockModel },
      ],
    }).compile();

    service = moduleRef.get(TicketsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
