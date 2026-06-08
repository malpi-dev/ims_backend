"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const brands_controller_1 = require("./controllers/brands.controller");
const models_controller_1 = require("./controllers/models.controller");
const product_types_controller_1 = require("./controllers/product-types.controller");
const products_controller_1 = require("./controllers/products.controller");
const attributes_controller_1 = require("./controllers/attributes.controller");
const parts_controller_1 = require("./controllers/parts.controller");
const brands_service_1 = require("./services/brands.service");
const models_service_1 = require("./services/models.service");
const product_types_service_1 = require("./services/product-types.service");
const products_service_1 = require("./services/products.service");
const attributes_service_1 = require("./services/attributes.service");
const attribute_options_service_1 = require("./services/attribute-options.service");
const parts_service_1 = require("./services/parts.service");
const brand_schema_1 = require("./schemas/brand.schema");
const model_schema_1 = require("./schemas/model.schema");
const product_type_schema_1 = require("./schemas/product-type.schema");
const product_schema_1 = require("./schemas/product.schema");
const attribute_schema_1 = require("./schemas/attribute.schema");
const attribute_option_schema_1 = require("./schemas/attribute-option.schema");
const product_type_attribute_schema_1 = require("./schemas/product-type-attribute.schema");
const product_attribute_value_schema_1 = require("./schemas/product-attribute-value.schema");
const part_schema_1 = require("./schemas/part.schema");
const product_part_schema_1 = require("./schemas/product-part.schema");
let InventoryModule = class InventoryModule {
};
exports.InventoryModule = InventoryModule;
exports.InventoryModule = InventoryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: brand_schema_1.Brand.name, schema: brand_schema_1.BrandSchema },
                { name: model_schema_1.Model.name, schema: model_schema_1.ModelSchema },
                { name: product_type_schema_1.ProductType.name, schema: product_type_schema_1.ProductTypeSchema },
                { name: product_schema_1.Product.name, schema: product_schema_1.ProductSchema },
                { name: attribute_schema_1.Attribute.name, schema: attribute_schema_1.AttributeSchema },
                { name: attribute_option_schema_1.AttributeOption.name, schema: attribute_option_schema_1.AttributeOptionSchema },
                { name: product_type_attribute_schema_1.ProductTypeAttribute.name, schema: product_type_attribute_schema_1.ProductTypeAttributeSchema },
                { name: product_attribute_value_schema_1.ProductAttributeValue.name, schema: product_attribute_value_schema_1.ProductAttributeValueSchema },
                { name: part_schema_1.Part.name, schema: part_schema_1.PartSchema },
                { name: product_part_schema_1.ProductPart.name, schema: product_part_schema_1.ProductPartSchema },
            ]),
        ],
        controllers: [
            brands_controller_1.BrandsController,
            models_controller_1.ModelsController,
            product_types_controller_1.ProductTypesController,
            products_controller_1.ProductsController,
            attributes_controller_1.AttributesController,
            parts_controller_1.PartsController,
        ],
        providers: [
            brands_service_1.BrandsService,
            models_service_1.ModelsService,
            product_types_service_1.ProductTypesService,
            products_service_1.ProductsService,
            attributes_service_1.AttributesService,
            attribute_options_service_1.AttributeOptionsService,
            parts_service_1.PartsService,
        ],
        exports: [products_service_1.ProductsService],
    })
], InventoryModule);
//# sourceMappingURL=inventory.module.js.map