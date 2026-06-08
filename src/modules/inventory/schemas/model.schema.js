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
exports.ModelSchema = exports.Model = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const base_schema_1 = require("../../../common/schemas/base.schema");
let Model = class Model extends base_schema_1.BaseSchema {
    brandId;
    name;
    code;
};
exports.Model = Model;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId, ref: 'Brand', required: true }),
    __metadata("design:type", String)
], Model.prototype, "brandId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Model.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Model.prototype, "code", void 0);
exports.Model = Model = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Model);
exports.ModelSchema = mongoose_1.SchemaFactory.createForClass(Model);
exports.ModelSchema.index({ brandId: 1, code: 1 }, { unique: true });
//# sourceMappingURL=model.schema.js.map