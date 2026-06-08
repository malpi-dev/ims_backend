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
exports.TicketSchema = exports.Ticket = exports.ResolutionSchema = exports.Resolution = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const base_schema_1 = require("../../../common/schemas/base.schema");
let Resolution = class Resolution {
    failureCause;
    negligence;
    replacedParts;
    evidenceImage;
    resolvedAt;
};
exports.Resolution = Resolution;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Resolution.prototype, "failureCause", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Resolution.prototype, "negligence", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Resolution.prototype, "replacedParts", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Resolution.prototype, "evidenceImage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Resolution.prototype, "resolvedAt", void 0);
exports.Resolution = Resolution = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], Resolution);
exports.ResolutionSchema = mongoose_1.SchemaFactory.createForClass(Resolution);
let Ticket = class Ticket extends base_schema_1.BaseSchema {
    folio;
    productId;
    reportedBy;
    reporterName;
    reporterContact;
    problemType;
    problemDescription;
    images;
    status;
    assignedTo;
    assignedAt;
    closedAt;
    resolution;
};
exports.Ticket = Ticket;
__decorate([
    (0, mongoose_1.Prop)({ type: String, unique: true }),
    __metadata("design:type", String)
], Ticket.prototype, "folio", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId, ref: 'Product', required: true }),
    __metadata("design:type", String)
], Ticket.prototype, "productId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId, ref: 'User', default: null }),
    __metadata("design:type", Object)
], Ticket.prototype, "reportedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], Ticket.prototype, "reporterName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], Ticket.prototype, "reporterContact", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Ticket.prototype, "problemType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Ticket.prototype, "problemDescription", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Ticket.prototype, "images", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['abierto', 'en_proceso', 'cerrado', 'pendiente', 'cancelado'],
        default: 'abierto',
    }),
    __metadata("design:type", String)
], Ticket.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId, ref: 'User', default: null }),
    __metadata("design:type", Object)
], Ticket.prototype, "assignedTo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: null }),
    __metadata("design:type", Object)
], Ticket.prototype, "assignedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: null }),
    __metadata("design:type", Object)
], Ticket.prototype, "closedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: exports.ResolutionSchema, default: null }),
    __metadata("design:type", Object)
], Ticket.prototype, "resolution", void 0);
exports.Ticket = Ticket = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Ticket);
exports.TicketSchema = mongoose_1.SchemaFactory.createForClass(Ticket);
//# sourceMappingURL=ticket.schema.js.map