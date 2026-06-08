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
exports.ClientsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const parse_object_id_pipe_1 = require("../../common/pipes/parse-object-id.pipe");
const clients_service_1 = require("./clients.service");
const create_client_dto_1 = require("./dto/create-client.dto");
const update_client_dto_1 = require("./dto/update-client.dto");
const create_area_dto_1 = require("./dto/create-area.dto");
const update_area_dto_1 = require("./dto/update-area.dto");
let ClientsController = class ClientsController {
    clientsService;
    constructor(clientsService) {
        this.clientsService = clientsService;
    }
    listClients(search, page, limit, includeDeleted) {
        return this.clientsService.findAll({ search, page, limit, includeDeleted });
    }
    createClient(dto) {
        return this.clientsService.create(dto);
    }
    getClient(id) {
        return this.clientsService.findOne(id);
    }
    updateClient(id, dto) {
        return this.clientsService.update(id, dto);
    }
    deleteClient(id) {
        return this.clientsService.remove(id);
    }
    listAreas(clientId, search, page, limit, includeDeleted) {
        return this.clientsService.listAreas(clientId, { search, page, limit, includeDeleted });
    }
    createArea(clientId, dto) {
        return this.clientsService.createArea(clientId, dto);
    }
    getArea(clientId, id) {
        return this.clientsService.getArea(clientId, id);
    }
    updateArea(clientId, id, dto) {
        return this.clientsService.updateArea(clientId, id, dto);
    }
    deleteArea(clientId, id) {
        return this.clientsService.removeArea(clientId, id);
    }
};
exports.ClientsController = ClientsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('includeDeleted')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, Boolean]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "listClients", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_client_dto_1.CreateClientDto]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "createClient", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "getClient", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_client_dto_1.UpdateClientDto]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "updateClient", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "deleteClient", null);
__decorate([
    (0, common_1.Get)(':clientId/areas'),
    __param(0, (0, common_1.Param)('clientId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Query)('search')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __param(4, (0, common_1.Query)('includeDeleted')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number, Boolean]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "listAreas", null);
__decorate([
    (0, common_1.Post)(':clientId/areas'),
    __param(0, (0, common_1.Param)('clientId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_area_dto_1.CreateAreaDto]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "createArea", null);
__decorate([
    (0, common_1.Get)(':clientId/areas/:id'),
    __param(0, (0, common_1.Param)('clientId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "getArea", null);
__decorate([
    (0, common_1.Patch)(':clientId/areas/:id'),
    __param(0, (0, common_1.Param)('clientId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_area_dto_1.UpdateAreaDto]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "updateArea", null);
__decorate([
    (0, common_1.Delete)(':clientId/areas/:id'),
    __param(0, (0, common_1.Param)('clientId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "deleteArea", null);
exports.ClientsController = ClientsController = __decorate([
    (0, swagger_1.ApiTags)('clients'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)('super-user', 'admin'),
    (0, common_1.Controller)('clients'),
    __metadata("design:paramtypes", [clients_service_1.ClientsService])
], ClientsController);
//# sourceMappingURL=clients.controller.js.map