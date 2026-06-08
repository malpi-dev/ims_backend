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
exports.PartsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const parse_object_id_pipe_1 = require("../../../common/pipes/parse-object-id.pipe");
const create_part_dto_1 = require("../dto/create-part.dto");
const update_part_dto_1 = require("../dto/update-part.dto");
const parts_service_1 = require("../services/parts.service");
let PartsController = class PartsController {
    partsService;
    constructor(partsService) {
        this.partsService = partsService;
    }
    list(search, page, limit, includeDeleted, partType) {
        return this.partsService.findAll({ search, page, limit, includeDeleted, partType });
    }
    create(dto) {
        return this.partsService.create(dto);
    }
    get(id) {
        return this.partsService.findOne(id);
    }
    update(id, dto) {
        return this.partsService.update(id, dto);
    }
    remove(id) {
        return this.partsService.remove(id);
    }
};
exports.PartsController = PartsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('includeDeleted')),
    __param(4, (0, common_1.Query)('partType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, Boolean, String]),
    __metadata("design:returntype", void 0)
], PartsController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_part_dto_1.CreatePartDto]),
    __metadata("design:returntype", void 0)
], PartsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PartsController.prototype, "get", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_part_dto_1.UpdatePartDto]),
    __metadata("design:returntype", void 0)
], PartsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PartsController.prototype, "remove", null);
exports.PartsController = PartsController = __decorate([
    (0, swagger_1.ApiTags)('parts'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('parts'),
    __metadata("design:paramtypes", [parts_service_1.PartsService])
], PartsController);
//# sourceMappingURL=parts.controller.js.map