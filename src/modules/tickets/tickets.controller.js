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
exports.TicketsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const parse_object_id_pipe_1 = require("../../common/pipes/parse-object-id.pipe");
const tickets_service_1 = require("./tickets.service");
const create_public_ticket_dto_1 = require("./dto/create-public-ticket.dto");
const create_ticket_dto_1 = require("./dto/create-ticket.dto");
const close_ticket_dto_1 = require("./dto/close-ticket.dto");
const ticket_query_dto_1 = require("./dto/ticket-query.dto");
let TicketsController = class TicketsController {
    ticketsService;
    constructor(ticketsService) {
        this.ticketsService = ticketsService;
    }
    createPublic(dto) {
        return this.ticketsService.createPublic(dto);
    }
    create(dto, user) {
        return this.ticketsService.create(dto, user.id);
    }
    list(query, page, limit) {
        return this.ticketsService.findAll({ query, page, limit });
    }
    report(query) {
        return this.ticketsService.report(query);
    }
    get(id) {
        return this.ticketsService.findOne(id);
    }
    take(id, user) {
        return this.ticketsService.take(id, user.id);
    }
    close(id, user, dto) {
        return this.ticketsService.close(id, user.id, dto);
    }
    pending(id, user) {
        return this.ticketsService.pending(id, user.id);
    }
    cancel(id) {
        return this.ticketsService.cancel(id);
    }
};
exports.TicketsController = TicketsController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('public'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_public_ticket_dto_1.CreatePublicTicketDto]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "createPublic", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ticket_dto_1.CreateTicketDto, Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)('admin', 'super-user', 'technician'),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ticket_query_dto_1.TicketQueryDto, Number, Number]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "list", null);
__decorate([
    (0, roles_decorator_1.Roles)('admin', 'super-user'),
    (0, common_1.Get)('report'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ticket_query_dto_1.TicketQueryDto]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "report", null);
__decorate([
    (0, roles_decorator_1.Roles)('admin', 'super-user', 'technician'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "get", null);
__decorate([
    (0, roles_decorator_1.Roles)('technician'),
    (0, common_1.Patch)(':id/take'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "take", null);
__decorate([
    (0, roles_decorator_1.Roles)('technician'),
    (0, common_1.Patch)(':id/close'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, close_ticket_dto_1.CloseTicketDto]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "close", null);
__decorate([
    (0, roles_decorator_1.Roles)('technician'),
    (0, common_1.Patch)(':id/pending'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "pending", null);
__decorate([
    (0, roles_decorator_1.Roles)('admin', 'super-user'),
    (0, common_1.Patch)(':id/cancel'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "cancel", null);
exports.TicketsController = TicketsController = __decorate([
    (0, swagger_1.ApiTags)('tickets'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('tickets'),
    __metadata("design:paramtypes", [tickets_service_1.TicketsService])
], TicketsController);
//# sourceMappingURL=tickets.controller.js.map