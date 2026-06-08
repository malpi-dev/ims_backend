import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandsController } from './controllers/brands.controller';
import { ModelsController } from './controllers/models.controller';
import { ProductTypesController } from './controllers/product-types.controller';
import { ProductsController } from './controllers/products.controller';
import { AttributesController } from './controllers/attributes.controller';
import { PartsController } from './controllers/parts.controller';
import { BrandsService } from './services/brands.service';
import { ModelsService } from './services/models.service';
import { ProductTypesService } from './services/product-types.service';
import { ProductsService } from './services/products.service';
import { AttributesService } from './services/attributes.service';
import { AttributeOptionsService } from './services/attribute-options.service';
import { PartsService } from './services/parts.service';
import { Brand, BrandSchema } from './schemas/brand.schema';
import { Model as InventoryModel, ModelSchema } from './schemas/model.schema';
import { ProductType, ProductTypeSchema } from './schemas/product-type.schema';
import { Product, ProductSchema } from './schemas/product.schema';
import { Attribute, AttributeSchema } from './schemas/attribute.schema';
import { AttributeOption, AttributeOptionSchema } from './schemas/attribute-option.schema';
import { ProductTypeAttribute, ProductTypeAttributeSchema } from './schemas/product-type-attribute.schema';
import { ProductAttributeValue, ProductAttributeValueSchema } from './schemas/product-attribute-value.schema';
import { Part, PartSchema } from './schemas/part.schema';
import { ProductPart, ProductPartSchema } from './schemas/product-part.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Brand.name, schema: BrandSchema },
      { name: InventoryModel.name, schema: ModelSchema },
      { name: ProductType.name, schema: ProductTypeSchema },
      { name: Product.name, schema: ProductSchema },
      { name: Attribute.name, schema: AttributeSchema },
      { name: AttributeOption.name, schema: AttributeOptionSchema },
      { name: ProductTypeAttribute.name, schema: ProductTypeAttributeSchema },
      { name: ProductAttributeValue.name, schema: ProductAttributeValueSchema },
      { name: Part.name, schema: PartSchema },
      { name: ProductPart.name, schema: ProductPartSchema },
    ]),
  ],
  controllers: [
    BrandsController,
    ModelsController,
    ProductTypesController,
    ProductsController,
    AttributesController,
    PartsController,
  ],
  providers: [
    BrandsService,
    ModelsService,
    ProductTypesService,
    ProductsService,
    AttributesService,
    AttributeOptionsService,
    PartsService,
  ],
  exports: [ProductsService],
})
export class InventoryModule {}
