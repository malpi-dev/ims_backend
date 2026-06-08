import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe } from '../../../common/pipes/parse-object-id.pipe';
import { CreateModelDto } from '../dto/create-model.dto';
import { UpdateModelDto } from '../dto/update-model.dto';
import { ModelsService } from '../services/models.service';

@ApiTags('models')
@ApiBearerAuth()
@Controller('models')
export class ModelsController {
  constructor(private readonly modelsService: ModelsService) {}

  @Get()
  list(
    @Query('search') search?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('includeDeleted') includeDeleted?: boolean,
    @Query('brandId') brandId?: string,
  ) {
    return this.modelsService.findAll({ search, page, limit, includeDeleted, brandId });
  }

  @Post()
  create(@Body() dto: CreateModelDto) {
    return this.modelsService.create(dto);
  }

  @Get(':id')
  get(@Param('id', ParseObjectIdPipe) id: string) {
    return this.modelsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() dto: UpdateModelDto) {
    return this.modelsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.modelsService.remove(id);
  }
}
