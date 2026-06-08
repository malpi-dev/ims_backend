import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { ParseObjectIdPipe } from '../../common/pipes/parse-object-id.pipe';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';

@ApiTags('clients')
@ApiBearerAuth()
@Roles('super-user', 'admin')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  listClients(
    @Query('search') search?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('includeDeleted') includeDeleted?: boolean,
  ) {
    return this.clientsService.findAll({ search, page, limit, includeDeleted });
  }

  @Post()
  createClient(@Body() dto: CreateClientDto) {
    return this.clientsService.create(dto);
  }

  @Get(':id')
  getClient(@Param('id', ParseObjectIdPipe) id: string) {
    return this.clientsService.findOne(id);
  }

  @Patch(':id')
  updateClient(@Param('id', ParseObjectIdPipe) id: string, @Body() dto: UpdateClientDto) {
    return this.clientsService.update(id, dto);
  }

  @Delete(':id')
  deleteClient(@Param('id', ParseObjectIdPipe) id: string) {
    return this.clientsService.remove(id);
  }

  @Get(':clientId/areas')
  listAreas(
    @Param('clientId', ParseObjectIdPipe) clientId: string,
    @Query('search') search?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('includeDeleted') includeDeleted?: boolean,
  ) {
    return this.clientsService.listAreas(clientId, { search, page, limit, includeDeleted });
  }

  @Post(':clientId/areas')
  createArea(
    @Param('clientId', ParseObjectIdPipe) clientId: string,
    @Body() dto: CreateAreaDto,
  ) {
    return this.clientsService.createArea(clientId, dto);
  }

  @Get(':clientId/areas/:id')
  getArea(
    @Param('clientId', ParseObjectIdPipe) clientId: string,
    @Param('id', ParseObjectIdPipe) id: string,
  ) {
    return this.clientsService.getArea(clientId, id);
  }

  @Patch(':clientId/areas/:id')
  updateArea(
    @Param('clientId', ParseObjectIdPipe) clientId: string,
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdateAreaDto,
  ) {
    return this.clientsService.updateArea(clientId, id, dto);
  }

  @Delete(':clientId/areas/:id')
  deleteArea(
    @Param('clientId', ParseObjectIdPipe) clientId: string,
    @Param('id', ParseObjectIdPipe) id: string,
  ) {
    return this.clientsService.removeArea(clientId, id);
  }
}
