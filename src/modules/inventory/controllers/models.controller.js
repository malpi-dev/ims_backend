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
exports.ModelsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const parse_object_id_pipe_1 = require("../../../common/pipes/parse-object-id.pipe");
const create_model_dto_1 = require("../dto/create-model.dto");
const update_model_dto_1 = require("../dto/update-model.dto");
const models_service_1 = require("../services/models.service");
let ModelsController = class ModelsController {
    modelsService;
    constructor(modelsService) {
        this.modelsService = modelsService;
    }
    list(search, page, limit, includeDeleted, brandId) {
        return this.modelsService.findAll({ search, page, limit, includeDeleted, brandId });
    }
    create(dto) {
        return this.modelsService.create(dto);
    }
    get(id) {
        return this.modelsService.findOne(id);
    }
    update(id, dto) {
        return this.modelsService.update(id, dto);
    }
    remove(id) {
        return this.modelsService.remove(id);
    }
};
exports.ModelsController = ModelsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('includeDeleted')),
    __param(4, (0, common_1.Query)('brandId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, Boolean, String]),
    __metadata("design:returntype", void 0)
], ModelsController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_model_dto_1.CreateModelDto]),
    __metadata("design:returntype", void 0)
], ModelsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ModelsController.prototype, "get", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_model_dto_1.UpdateModelDto]),
    __metadata("design:returntype", void 0)
], ModelsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ModelsController.prototype, "remove", null);
exports.ModelsController = ModelsController = __decorate([
    (0, swagger_1.ApiTags)('models'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('models'),
    __metadata("design:paramtypes", [models_service_1.ModelsService])
], ModelsController);
//# sourceMappingURL=models.controller.js.map