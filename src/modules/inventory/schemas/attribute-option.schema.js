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
exports.AttributeOptionSchema = exports.AttributeOption = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const base_schema_1 = require("../../../common/schemas/base.schema");
let AttributeOption = class AttributeOption extends base_schema_1.BaseSchema {
    attributeId;
    label;
    value;
};
exports.AttributeOption = AttributeOption;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId, ref: 'Attribute', required: true }),
    __metadata("design:type", String)
], AttributeOption.prototype, "attributeId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], AttributeOption.prototype, "label", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], AttributeOption.prototype, "value", void 0);
exports.AttributeOption = AttributeOption = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], AttributeOption);
exports.AttributeOptionSchema = mongoose_1.SchemaFactory.createForClass(AttributeOption);
exports.AttributeOptionSchema.index({ attributeId: 1, value: 1 }, { unique: true });
//# sourceMappingURL=attribute-option.schema.js.map