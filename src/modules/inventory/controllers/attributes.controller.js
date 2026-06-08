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
exports.AttributesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const parse_object_id_pipe_1 = require("../../../common/pipes/parse-object-id.pipe");
const create_attribute_dto_1 = require("../dto/create-attribute.dto");
const update_attribute_dto_1 = require("../dto/update-attribute.dto");
const create_attribute_option_dto_1 = require("../dto/create-attribute-option.dto");
const attributes_service_1 = require("../services/attributes.service");
const attribute_options_service_1 = require("../services/attribute-options.service");
let AttributesController = class AttributesController {
    attributesService;
    attributeOptionsService;
    constructor(attributesService, attributeOptionsService) {
        this.attributesService = attributesService;
        this.attributeOptionsService = attributeOptionsService;
    }
    list(search, page, limit, includeDeleted) {
        return this.attributesService.findAll({ search, page, limit, includeDeleted });
    }
    create(dto) {
        return this.attributesService.create(dto);
    }
    get(id) {
        return this.attributesService.findOne(id);
    }
    update(id, dto) {
        return this.attributesService.update(id, dto);
    }
    remove(id) {
        return this.attributesService.remove(id);
    }
    listOptions(attributeId, page, limit) {
        return this.attributeOptionsService.list(attributeId, { page, limit });
    }
    createOption(attributeId, dto) {
        return this.attributeOptionsService.create(attributeId, dto);
    }
    updateOption(attributeId, id, dto) {
        return this.attributeOptionsService.update(attributeId, id, dto);
    }
    removeOption(attributeId, id) {
        return this.attributeOptionsService.remove(attributeId, id);
    }
};
exports.AttributesController = AttributesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('includeDeleted')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, Boolean]),
    __metadata("design:returntype", void 0)
], AttributesController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_attribute_dto_1.CreateAttributeDto]),
    __metadata("design:returntype", void 0)
], AttributesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AttributesController.prototype, "get", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_attribute_dto_1.UpdateAttributeDto]),
    __metadata("design:returntype", void 0)
], AttributesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AttributesController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':attributeId/options'),
    __param(0, (0, common_1.Param)('attributeId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", void 0)
], AttributesController.prototype, "listOptions", null);
__decorate([
    (0, common_1.Post)(':attributeId/options'),
    __param(0, (0, common_1.Param)('attributeId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_attribute_option_dto_1.CreateAttributeOptionDto]),
    __metadata("design:returntype", void 0)
], AttributesController.prototype, "createOption", null);
__decorate([
    (0, common_1.Patch)(':attributeId/options/:id'),
    __param(0, (0, common_1.Param)('attributeId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, create_attribute_option_dto_1.CreateAttributeOptionDto]),
    __metadata("design:returntype", void 0)
], AttributesController.prototype, "updateOption", null);
__decorate([
    (0, common_1.Delete)(':attributeId/options/:id'),
    __param(0, (0, common_1.Param)('attributeId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AttributesController.prototype, "removeOption", null);
exports.AttributesController = AttributesController = __decorate([
    (0, swagger_1.ApiTags)('attributes'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('attributes'),
    __metadata("design:paramtypes", [attributes_service_1.AttributesService,
        attribute_options_service_1.AttributeOptionsService])
], AttributesController);
//# sourceMappingURL=attributes.controller.js.map