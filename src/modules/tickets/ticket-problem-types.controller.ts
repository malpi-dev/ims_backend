import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe } from '../../common/pipes/parse-object-id.pipe';
import { TicketsService } from './tickets.service';
import {
  CreateTicketProblemTypeDto,
  UpdateTicketProblemTypeDto,
} from './dto/problem-type.dto';

@ApiTags('ticket-problem-types')
@ApiBearerAuth()
@Controller('ticket-problem-types')
export class TicketProblemTypesController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  list(@Query('productTypeId') productTypeId?: string) {
    return this.ticketsService.listProblemTypes(productTypeId);
  }

  @Post()
  create(@Body() dto: CreateTicketProblemTypeDto) {
    return this.ticketsService.createProblemType(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdateTicketProblemTypeDto,
  ) {
    return this.ticketsService.updateProblemType(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.ticketsService.deleteProblemType(id);
  }
}
