import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe } from '../../../common/pipes/parse-object-id.pipe';
import { CreatePartDto } from '../dto/create-part.dto';
import { UpdatePartDto } from '../dto/update-part.dto';
import { PartsService } from '../services/parts.service';

@ApiTags('parts')
@ApiBearerAuth()
@Controller('parts')
export class PartsController {
  constructor(private readonly partsService: PartsService) {}

  @Get()
  list(
    @Query('search') search?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('includeDeleted') includeDeleted?: boolean,
    @Query('partType') partType?: string,
  ) {
    return this.partsService.findAll({ search, page, limit, includeDeleted, partType });
  }

  @Post()
  create(@Body() dto: CreatePartDto) {
    return this.partsService.create(dto);
  }

  @Get(':id')
  get(@Param('id', ParseObjectIdPipe) id: string) {
    return this.partsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() dto: UpdatePartDto) {
    return this.partsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.partsService.remove(id);
  }
}
