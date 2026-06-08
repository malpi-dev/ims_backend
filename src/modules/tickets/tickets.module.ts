import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { Ticket, TicketSchema } from './schemas/ticket.schema';
import { TicketProblemType, TicketProblemTypeSchema } from './schemas/ticket-problem-type.schema';
import { TicketProblemTypesController } from './ticket-problem-types.controller';
import { Product, ProductSchema } from '../inventory/schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ticket.name, schema: TicketSchema },
      { name: TicketProblemType.name, schema: TicketProblemTypeSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  controllers: [TicketsController, TicketProblemTypesController],
  providers: [TicketsService],
  exports: [TicketsService],
})
export class TicketsModule {}
