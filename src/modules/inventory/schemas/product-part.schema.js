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
exports.ProductPartSchema = exports.ProductPart = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const base_schema_1 = require("../../../common/schemas/base.schema");
let ProductPart = class ProductPart extends base_schema_1.BaseSchema {
    productId;
    partId;
    folio;
    status;
    assignedAt;
    notes;
};
exports.ProductPart = ProductPart;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId, ref: 'Product', required: true }),
    __metadata("design:type", String)
], ProductPart.prototype, "productId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId, ref: 'Part', required: true }),
    __metadata("design:type", String)
], ProductPart.prototype, "partId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], ProductPart.prototype, "folio", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['assigned', 'in_stock', 'consumed', 'lost', 'damaged', 'retired'],
        default: 'assigned',
    }),
    __metadata("design:type", String)
], ProductPart.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], ProductPart.prototype, "assignedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ProductPart.prototype, "notes", void 0);
exports.ProductPart = ProductPart = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], ProductPart);
exports.ProductPartSchema = mongoose_1.SchemaFactory.createForClass(ProductPart);
//# sourceMappingURL=product-part.schema.js.map