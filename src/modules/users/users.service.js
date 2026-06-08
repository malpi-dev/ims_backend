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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../auth/schemas/user.schema");
const person_schema_1 = require("../auth/schemas/person.schema");
const soft_delete_helper_1 = require("../../common/helpers/soft-delete.helper");
let UsersService = class UsersService {
    userModel;
    personModel;
    constructor(userModel, personModel) {
        this.userModel = userModel;
        this.personModel = personModel;
    }
    async findAll(params) {
        const page = Number(params.page) || 1;
        const limit = Math.min(Number(params.limit) || 20, 100);
        const search = params.search?.trim();
        const filter = {
            ...(0, soft_delete_helper_1.softDeleteCondition)(params.includeDeleted),
        };
        if (search) {
            filter.email = { $regex: search, $options: 'i' };
        }
        const total = await this.userModel.countDocuments(filter);
        const data = await this.userModel
            .find(filter)
            .select('-password')
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
        const exists = await this.userModel.findOne({
            email: dto.email,
            ...(0, soft_delete_helper_1.softDeleteCondition)(false),
        });
        if (exists) {
            throw new common_1.BadRequestException('El email ya está registrado');
        }
        const user = await this.userModel.create({
            email: dto.email,
            password: dto.password,
            role: dto.role,
        });
        await this.personModel.create({ userId: user._id });
        return this.userModel.findById(user._id).select('-password');
    }
    async findOne(id) {
        const user = await this.userModel
            .findOne({ _id: id, ...(0, soft_delete_helper_1.softDeleteCondition)(false) })
            .select('-password');
        if (!user) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        return user;
    }
    async updateEmail(id, dto) {
        const user = await this.userModel
            .findOne({ _id: id, ...(0, soft_delete_helper_1.softDeleteCondition)(false) })
            .select('-password');
        if (!user) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        user.email = dto.email;
        await user.save();
        return user;
    }
    async updatePassword(id, dto) {
        const user = await this.userModel
            .findOne({ _id: id, ...(0, soft_delete_helper_1.softDeleteCondition)(false) })
            .select('+password');
        if (!user) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        user.password = dto.password;
        await user.save();
        return { data: true, message: 'Contraseña actualizada' };
    }
    async updateStatus(currentUserId, id, dto) {
        if (currentUserId === id) {
            throw new common_1.ForbiddenException('No puedes banearte a ti mismo');
        }
        const user = await this.userModel
            .findOne({ _id: id, ...(0, soft_delete_helper_1.softDeleteCondition)(false) })
            .select('-password');
        if (!user) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        user.status = dto.status;
        await user.save();
        return user;
    }
    async softDelete(id) {
        const user = await this.userModel.findOne({ _id: id, ...(0, soft_delete_helper_1.softDeleteQuery)(false) });
        if (!user) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        user.deletedAt = new Date();
        await user.save();
        return { data: true, message: 'Usuario eliminado' };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(person_schema_1.Person.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map