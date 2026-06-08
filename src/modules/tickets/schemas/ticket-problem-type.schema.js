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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketProblemTypeSchema = exports.TicketProblemType = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const base_schema_1 = require("../../../common/schemas/base.schema");
let TicketProblemType = class TicketProblemType extends base_schema_1.BaseSchema {
    productTypeId;
    name;
    description;
};
exports.TicketProblemType = TicketProblemType;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId, ref: 'ProductType', required: true }),
    __metadata("design:type", String)
], TicketProblemType.prototype, "productTypeId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TicketProblemType.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TicketProblemType.prototype, "description", void 0);
exports.TicketProblemType = TicketProblemType = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], TicketProblemType);
exports.TicketProblemTypeSchema = mongoose_1.SchemaFactory.createForClass(TicketProblemType);
//# sourceMappingURL=ticket-problem-type.schema.js.map