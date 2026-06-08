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
exports.ProductAttributeValueSchema = exports.ProductAttributeValue = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const base_schema_1 = require("../../../common/schemas/base.schema");
let ProductAttributeValue = class ProductAttributeValue extends base_schema_1.BaseSchema {
    productId;
    attributeId;
    valueString;
    valueNumber;
    valueBoolean;
    valueDate;
    valueJson;
    valueEnum;
};
exports.ProductAttributeValue = ProductAttributeValue;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId, ref: 'Product', required: true }),
    __metadata("design:type", String)
], ProductAttributeValue.prototype, "productId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId, ref: 'Attribute', required: true }),
    __metadata("design:type", String)
], ProductAttributeValue.prototype, "attributeId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], ProductAttributeValue.prototype, "valueString", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: null }),
    __metadata("design:type", Object)
], ProductAttributeValue.prototype, "valueNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: null }),
    __metadata("design:type", Object)
], ProductAttributeValue.prototype, "valueBoolean", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: null }),
    __metadata("design:type", Object)
], ProductAttributeValue.prototype, "valueDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.Mixed, default: null }),
    __metadata("design:type", Object)
], ProductAttributeValue.prototype, "valueJson", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], ProductAttributeValue.prototype, "valueEnum", void 0);
exports.ProductAttributeValue = ProductAttributeValue = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], ProductAttributeValue);
exports.ProductAttributeValueSchema = mongoose_1.SchemaFactory.createForClass(ProductAttributeValue);
exports.ProductAttributeValueSchema.index({ productId: 1, attributeId: 1 }, { unique: true });
//# sourceMappingURL=product-attribute-value.schema.js.map