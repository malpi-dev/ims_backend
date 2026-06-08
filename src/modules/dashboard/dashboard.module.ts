import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { User, UserSchema } from '../auth/schemas/user.schema';
import { Product, ProductSchema } from '../inventory/schemas/product.schema';
import { Ticket, TicketSchema } from '../tickets/schemas/ticket.schema';
import { Client, ClientSchema } from '../clients/schemas/client.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Product.name, schema: ProductSchema },
      { name: Ticket.name, schema: TicketSchema },
      { name: Client.name, schema: ClientSchema },
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
