import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../auth/schemas/user.schema';
import { Product } from '../inventory/schemas/product.schema';
import { Ticket } from '../tickets/schemas/ticket.schema';
import { Client } from '../clients/schemas/client.schema';
import { softDeleteCondition } from '../../common/helpers/soft-delete.helper';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(Ticket.name) private readonly ticketModel: Model<Ticket>,
    @InjectModel(Client.name) private readonly clientModel: Model<Client>,
  ) {}

  async getMetrics() {
    const [
      totalUsers,
      activeUsers,
      totalProducts,
      totalTickets,
      totalClients,
      activeClients,
    ] = await Promise.all([
      this.userModel.countDocuments(softDeleteCondition(false)),
      this.userModel.countDocuments({
        ...softDeleteCondition(false),
        status: 'active',
      }),
      this.productModel.countDocuments(softDeleteCondition(false)),
      this.ticketModel.countDocuments(softDeleteCondition(false)),
      this.clientModel.countDocuments(softDeleteCondition(false)),
      this.clientModel.countDocuments({
        ...softDeleteCondition(false),
        status: 'active',
      }),
    ]);

    const productsByStatusAgg = await this.productModel.aggregate([
      { $match: softDeleteCondition(false) },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const ticketsByStatusAgg = await this.ticketModel.aggregate([
      { $match: softDeleteCondition(false) },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const productsByStatus = productsByStatusAgg.reduce(
      (acc, item) => ({ ...acc, [item._id]: item.count }),
      {},
    );
    const ticketsByStatus = ticketsByStatusAgg.reduce(
      (acc, item) => ({ ...acc, [item._id]: item.count }),
      {},
    );

    const recentTickets = await this.ticketModel
      .find(softDeleteCondition(false))
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('productId');

    const ticketsByMonthAgg = await this.ticketModel.aggregate([
      { $match: softDeleteCondition(false) },
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
      recentTickets: recentTickets.map((ticket: any) => ({
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

  async getTechMetrics(technicianId: string) {
    const baseCondition = softDeleteCondition(false);

    const [abierto, enProceso, pendiente, cerrado] = await Promise.all([
      this.ticketModel.countDocuments({
        ...baseCondition,
        status: 'abierto',
      }),
      this.ticketModel.countDocuments({
        ...baseCondition,
        status: 'en_proceso',
        assignedTo: technicianId,
      }),
      this.ticketModel.countDocuments({
        ...baseCondition,
        status: 'pendiente',
        assignedTo: technicianId,
      }),
      this.ticketModel.countDocuments({
        ...baseCondition,
        status: 'cerrado',
        assignedTo: technicianId,
      }),
    ]);

    const recentAssigned = await this.ticketModel
      .find({
        ...baseCondition,
        assignedTo: technicianId,
        assignedAt: { $ne: null },
      })
      .sort({ assignedAt: -1 })
      .limit(5)
      .populate('productId');

    return {
      abierto,
      enProceso,
      pendiente,
      cerrado,
      total: abierto + enProceso + pendiente + cerrado,
      assignedTickets: recentAssigned.map((ticket: any) => ({
        _id: ticket._id,
        folio: ticket.folio,
        status: ticket.status,
        problemType: ticket.problemType,
        createdAt: ticket.createdAt,
        product: ticket.productId
          ? { inventoryCode: ticket.productId.inventoryCode }
          : null,
      })),
    };
  }
}
