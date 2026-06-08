import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
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
