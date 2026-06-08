import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ParseObjectIdPipe } from '../../common/pipes/parse-object-id.pipe';
import { TicketsService } from './tickets.service';
import { CreatePublicTicketDto } from './dto/create-public-ticket.dto';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { CloseTicketDto } from './dto/close-ticket.dto';
import { TicketQueryDto } from './dto/ticket-query.dto';

@ApiTags('tickets')
@ApiBearerAuth()
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Public()
  @Post('public')
  createPublic(@Body() dto: CreatePublicTicketDto) {
    return this.ticketsService.createPublic(dto);
  }

  @Post()
  create(@Body() dto: CreateTicketDto, @CurrentUser() user: any) {
    return this.ticketsService.create(dto, user.id);
  }

  @Roles('admin', 'super-user', 'technician')
  @Get()
  list(
    @Query() query: TicketQueryDto,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.ticketsService.findAll({ query, page, limit });
  }

  @Roles('admin', 'super-user')
  @Get('report')
  report(@Query() query: TicketQueryDto) {
    return this.ticketsService.report(query);
  }

  @Roles('admin', 'super-user', 'technician')
  @Get(':id')
  get(@Param('id', ParseObjectIdPipe) id: string) {
    return this.ticketsService.findOne(id);
  }

  @Roles('technician')
  @Patch(':id/take')
  take(@Param('id', ParseObjectIdPipe) id: string, @CurrentUser() user: any) {
    return this.ticketsService.take(id, user.id);
  }

  @Roles('technician')
  @Patch(':id/close')
  close(
    @Param('id', ParseObjectIdPipe) id: string,
    @CurrentUser() user: any,
    @Body() dto: CloseTicketDto,
  ) {
    return this.ticketsService.close(id, user.id, dto);
  }

  @Roles('technician')
  @Patch(':id/pending')
  pending(@Param('id', ParseObjectIdPipe) id: string, @CurrentUser() user: any) {
    return this.ticketsService.pending(id, user.id);
  }

  @Roles('admin', 'super-user')
  @Patch(':id/cancel')
  cancel(@Param('id', ParseObjectIdPipe) id: string) {
    return this.ticketsService.cancel(id);
  }

}
