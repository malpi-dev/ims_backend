import { Model } from 'mongoose';
import { User } from '../auth/schemas/user.schema';
import { Product } from '../inventory/schemas/product.schema';
import { Ticket } from '../tickets/schemas/ticket.schema';
import { Client } from '../clients/schemas/client.schema';
export declare class DashboardService {
    private readonly userModel;
    private readonly productModel;
    private readonly ticketModel;
    private readonly clientModel;
    constructor(userModel: Model<User>, productModel: Model<Product>, ticketModel: Model<Ticket>, clientModel: Model<Client>);
    getMetrics(): Promise<{
        totalUsers: number;
        activeUsers: number;
        totalProducts: number;
        activeProducts: any;
        totalTickets: number;
        ticketsByStatus: any;
        productsByStatus: any;
        totalClients: number;
        activeClients: number;
        recentTickets: {
            _id: any;
            folio: any;
            status: any;
            problemType: any;
            createdAt: any;
            product: {
                inventoryCode: any;
            } | null;
        }[];
        ticketsByMonth: {
            month: any;
            count: any;
        }[];
    }>;
}
