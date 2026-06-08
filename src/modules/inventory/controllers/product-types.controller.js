"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductTypesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const parse_object_id_pipe_1 = require("../../../common/pipes/parse-object-id.pipe");
const create_product_type_dto_1 = require("../dto/create-product-type.dto");
const update_product_type_dto_1 = require("../dto/update-product-type.dto");
const product_types_service_1 = require("../services/product-types.service");
let ProductTypesController = class ProductTypesController {
    productTypesService;
    constructor(productTypesService) {
        this.productTypesService = productTypesService;
    }
    list(search, page, limit, includeDeleted) {
        return this.productTypesService.findAll({ search, page, limit, includeDeleted });
    }
    create(dto) {
        return this.productTypesService.create(dto);
    }
    get(id) {
        return this.productTypesService.findOne(id);
    }
    update(id, dto) {
        return this.productTypesService.update(id, dto);
    }
    remove(id) {
        return this.productTypesService.remove(id);
    }
};
exports.ProductTypesController = ProductTypesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('includeDeleted')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, Boolean]),
    __metadata("design:returntype", void 0)
], ProductTypesController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_type_dto_1.CreateProductTypeDto]),
    __metadata("design:returntype", void 0)
], ProductTypesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductTypesController.prototype, "get", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_type_dto_1.UpdateProductTypeDto]),
    __metadata("design:returntype", void 0)
], ProductTypesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductTypesController.prototype, "remove", null);
exports.ProductTypesController = ProductTypesController = __decorate([
    (0, swagger_1.ApiTags)('product-types'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('product-types'),
    __metadata("design:paramtypes", [product_types_service_1.ProductTypesService])
], ProductTypesController);
//# sourceMappingURL=product-types.controller.js.map