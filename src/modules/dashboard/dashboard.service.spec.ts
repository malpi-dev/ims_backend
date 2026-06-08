import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { DashboardService } from './dashboard.service';
import { User } from '../auth/schemas/user.schema';
import { Product } from '../inventory/schemas/product.schema';
import { Ticket } from '../tickets/schemas/ticket.schema';
import { Client } from '../clients/schemas/client.schema';

describe('DashboardService', () => {
  let service: DashboardService;

  const mockUserModel = {
    countDocuments: jest.fn(),
  };
  const mockProductModel = {
    countDocuments: jest.fn(),
    aggregate: jest.fn(),
  };
  const mockTicketModel = {
    countDocuments: jest.fn(),
    aggregate: jest.fn(),
    find: jest.fn().mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      populate: jest.fn().mockResolvedValue([]),
    }),
  };
  const mockClientModel = {
    countDocuments: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DashboardService,
        { provide: getModelToken(User.name), useValue: mockUserModel },
        { provide: getModelToken(Product.name), useValue: mockProductModel },
        { provide: getModelToken(Ticket.name), useValue: mockTicketModel },
        { provide: getModelToken(Client.name), useValue: mockClientModel },
      ],
    }).compile();

    service = moduleRef.get(DashboardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getMetrics', () => {
    it('should return all aggregated metrics', async () => {
      mockUserModel.countDocuments
        .mockResolvedValueOnce(10)
        .mockResolvedValueOnce(8);
      mockProductModel.countDocuments.mockResolvedValueOnce(50);
      mockTicketModel.countDocuments.mockResolvedValueOnce(100);
      mockClientModel.countDocuments
        .mockResolvedValueOnce(5)
        .mockResolvedValueOnce(4);
      mockProductModel.aggregate.mockResolvedValueOnce([
        { _id: 'active', count: 40 },
        { _id: 'inactive', count: 10 },
      ]);
      mockTicketModel.aggregate
        .mockResolvedValueOnce([
          { _id: 'open', count: 30 },
          { _id: 'closed', count: 70 },
        ])
        .mockResolvedValueOnce([
          { _id: '2026-01', count: 10 },
          { _id: '2026-02', count: 15 },
        ]);
      mockTicketModel.find().sort().limit().populate.mockResolvedValueOnce([]);

      const result = await service.getMetrics();

      expect(result.totalUsers).toBe(10);
      expect(result.activeUsers).toBe(8);
      expect(result.totalProducts).toBe(50);
      expect(result.activeProducts).toBe(40);
      expect(result.totalTickets).toBe(100);
      expect(result.totalClients).toBe(5);
      expect(result.activeClients).toBe(4);
      expect(result.productsByStatus).toEqual({ active: 40, inactive: 10 });
      expect(result.ticketsByStatus).toEqual({ open: 30, closed: 70 });
      expect(result.ticketsByMonth).toHaveLength(2);
    });
  });
});
