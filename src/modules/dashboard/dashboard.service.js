"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../auth/schemas/user.schema");
const product_schema_1 = require("../inventory/schemas/product.schema");
const ticket_schema_1 = require("../tickets/schemas/ticket.schema");
const client_schema_1 = require("../clients/schemas/client.schema");
const soft_delete_helper_1 = require("../../common/helpers/soft-delete.helper");
let DashboardService = class DashboardService {
    userModel;
    productModel;
    ticketModel;
    clientModel;
    constructor(userModel, productModel, ticketModel, clientModel) {
        this.userModel = userModel;
        this.productModel = productModel;
        this.ticketModel = ticketModel;
        this.clientModel = clientModel;
    }
    async getMetrics() {
        const [totalUsers, activeUsers, totalProducts, totalTickets, totalClients, activeClients,] = await Promise.all([
            this.userModel.countDocuments((0, soft_delete_helper_1.softDeleteCondition)(false)),
            this.userModel.countDocuments({
                ...(0, soft_delete_helper_1.softDeleteCondition)(false),
                status: 'active',
            }),
            this.productModel.countDocuments((0, soft_delete_helper_1.softDeleteCondition)(false)),
            this.ticketModel.countDocuments((0, soft_delete_helper_1.softDeleteCondition)(false)),
            this.clientModel.countDocuments((0, soft_delete_helper_1.softDeleteCondition)(false)),
            this.clientModel.countDocuments({
                ...(0, soft_delete_helper_1.softDeleteCondition)(false),
                status: 'active',
            }),
        ]);
        const productsByStatusAgg = await this.productModel.aggregate([
            { $match: (0, soft_delete_helper_1.softDeleteCondition)(false) },
            { $group: { _id: '$status', count: { $sum: 1 } } },
        ]);
        const ticketsByStatusAgg = await this.ticketModel.aggregate([
            { $match: (0, soft_delete_helper_1.softDeleteCondition)(false) },
            { $group: { _id: '$status', count: { $sum: 1 } } },
        ]);
        const productsByStatus = productsByStatusAgg.reduce((acc, item) => ({ ...acc, [item._id]: item.count }), {});
        const ticketsByStatus = ticketsByStatusAgg.reduce((acc, item) => ({ ...acc, [item._id]: item.count }), {});
        const recentTickets = await this.ticketModel
            .find((0, soft_delete_helper_1.softDeleteCondition)(false))
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('productId');
        const ticketsByMonthAgg = await this.ticketModel.aggregate([
            { $match: (0, soft_delete_helper_1.softDeleteCondition)(false) },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
                    count: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
        ]);
        return {
            totalUsers,
            activeUsers,
            totalProducts,
            activeProducts: productsByStatus['active'] || 0,
            totalTickets,
            ticketsByStatus,
            productsByStatus,
            totalClients,
            activeClients,
            recentTickets: recentTickets.map((ticket) => ({
                _id: ticket._id,
                folio: ticket.folio,
                status: ticket.status,
                problemType: ticket.problemType,
                createdAt: ticket.createdAt,
                product: ticket.productId
                    ? { inventoryCode: ticket.productId.inventoryCode }
                    : null,
            })),
            ticketsByMonth: ticketsByMonthAgg.map((item) => ({
                month: item._id,
                count: item.count,
            })),
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __param(2, (0, mongoose_1.InjectModel)(ticket_schema_1.Ticket.name)),
    __param(3, (0, mongoose_1.InjectModel)(client_schema_1.Client.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map