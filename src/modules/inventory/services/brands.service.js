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
exports.BrandsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const brand_schema_1 = require("../schemas/brand.schema");
const soft_delete_helper_1 = require("../../../common/helpers/soft-delete.helper");
let BrandsService = class BrandsService {
    brandModel;
    constructor(brandModel) {
        this.brandModel = brandModel;
    }
    async findAll(params) {
        const page = Number(params.page) || 1;
        const limit = Math.min(Number(params.limit) || 20, 100);
        const search = params.search?.trim();
        const filter = {
            ...(0, soft_delete_helper_1.softDeleteCondition)(params.includeDeleted),
        };
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { code: { $regex: search, $options: 'i' } },
            ];
        }
        const total = await this.brandModel.countDocuments(filter);
        const data = await this.brandModel
            .find(filter)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 });
        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async create(dto) {
        return this.brandModel.create(dto);
    }
    async findOne(id) {
        const brand = await this.brandModel.findById(id);
        if (!brand)
            throw new common_1.NotFoundException('Marca no encontrada');
        return brand;
    }
    async update(id, dto) {
        const brand = await this.brandModel.findById(id);
        if (!brand)
            throw new common_1.NotFoundException('Marca no encontrada');
        Object.assign(brand, dto);
        await brand.save();
        return brand;
    }
    async remove(id) {
        const brand = await this.brandModel.findOne({ _id: id, ...(0, soft_delete_helper_1.softDeleteQuery)(false) });
        if (!brand)
            throw new common_1.NotFoundException('Marca no encontrada');
        brand.deletedAt = new Date();
        await brand.save();
        return { data: true, message: 'Marca eliminada' };
    }
};
exports.BrandsService = BrandsService;
exports.BrandsService = BrandsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(brand_schema_1.Brand.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BrandsService);
//# sourceMappingURL=brands.service.js.map