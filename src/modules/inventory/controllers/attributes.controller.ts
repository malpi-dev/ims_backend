import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe } from '../../../common/pipes/parse-object-id.pipe';
import { CreateAttributeDto } from '../dto/create-attribute.dto';
import { UpdateAttributeDto } from '../dto/update-attribute.dto';
import { CreateAttributeOptionDto } from '../dto/create-attribute-option.dto';
import { AttributesService } from '../services/attributes.service';
import { AttributeOptionsService } from '../services/attribute-options.service';

@ApiTags('attributes')
@ApiBearerAuth()
@Controller('attributes')
export class AttributesController {
  constructor(
    private readonly attributesService: AttributesService,
    private readonly attributeOptionsService: AttributeOptionsService,
  ) {}

  @Get()
  list(
    @Query('search') search?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('includeDeleted') includeDeleted?: boolean,
  ) {
    return this.attributesService.findAll({ search, page, limit, includeDeleted });
  }

  @Post()
  create(@Body() dto: CreateAttributeDto) {
    return this.attributesService.create(dto);
  }

  @Get(':id')
  get(@Param('id', ParseObjectIdPipe) id: string) {
    return this.attributesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() dto: UpdateAttributeDto) {
    return this.attributesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.attributesService.remove(id);
  }

  @Get(':attributeId/options')
  listOptions(
    @Param('attributeId', ParseObjectIdPipe) attributeId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.attributeOptionsService.list(attributeId, { page, limit });
  }

  @Post(':attributeId/options')
  createOption(
    @Param('attributeId', ParseObjectIdPipe) attributeId: string,
    @Body() dto: CreateAttributeOptionDto,
  ) {
    return this.attributeOptionsService.create(attributeId, dto);
  }

  @Patch(':attributeId/options/:id')
  updateOption(
    @Param('attributeId', ParseObjectIdPipe) attributeId: string,
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: CreateAttributeOptionDto,
  ) {
    return this.attributeOptionsService.update(attributeId, id, dto);
  }

  @Delete(':attributeId/options/:id')
  removeOption(
    @Param('attributeId', ParseObjectIdPipe) attributeId: string,
    @Param('id', ParseObjectIdPipe) id: string,
  ) {
    return this.attributeOptionsService.remove(attributeId, id);
  }
}
