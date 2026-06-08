import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe } from '../../../common/pipes/parse-object-id.pipe';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { AssignPartDto } from '../dto/assign-part.dto';
import { UpdateAttributeValueDto } from '../dto/update-attribute-value.dto';
import { ProductsService } from '../services/products.service';

@ApiTags('products')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  list(
    @Query('search') search?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('includeDeleted') includeDeleted?: boolean,
    @Query('status') status?: string,
    @Query('productTypeId') productTypeId?: string,
    @Query('modelId') modelId?: string,
  ) {
    return this.productsService.findAll({
      search,
      page,
      limit,
      includeDeleted,
      status,
      productTypeId,
      modelId,
    });
  }

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Get('lookup/:inventoryCode')
  lookup(@Param('inventoryCode') inventoryCode: string) {
    return this.productsService.lookupByInventoryCode(inventoryCode);
  }

  @Get(':id')
  get(@Param('id', ParseObjectIdPipe) id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.productsService.remove(id);
  }

  @Post(':id/parts')
  assignPart(@Param('id', ParseObjectIdPipe) id: string, @Body() dto: AssignPartDto) {
    return this.productsService.assignPart(id, dto);
  }

  @Patch(':id/attributes')
  updateAttributes(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdateAttributeValueDto,
  ) {
    return this.productsService.updateAttributeValue(id, dto);
  }
}
