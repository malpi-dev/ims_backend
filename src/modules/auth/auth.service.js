"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const mongoose_2 = require("mongoose");
const bcrypt = __importStar(require("bcrypt"));
const user_schema_1 = require("./schemas/user.schema");
const person_schema_1 = require("./schemas/person.schema");
const refresh_token_schema_1 = require("./schemas/refresh-token.schema");
const soft_delete_helper_1 = require("../../common/helpers/soft-delete.helper");
let AuthService = class AuthService {
    userModel;
    personModel;
    refreshTokenModel;
    jwtService;
    configService;
    constructor(userModel, personModel, refreshTokenModel, jwtService, configService) {
        this.userModel = userModel;
        this.personModel = personModel;
        this.refreshTokenModel = refreshTokenModel;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async generateTokens(user) {
        const payload = {
            sub: user._id.toString(),
            email: user.email,
            role: user.role,
        };
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get('JWT_ACCESS_SECRET'),
            expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN'),
        });
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
        });
        const expiresAt = new Date(Date.now() +
            this.parseExpiresIn(this.configService.get('JWT_REFRESH_EXPIRES_IN') || '7d'));
        await this.refreshTokenModel.create({
            userId: user._id,
            token: refreshToken,
            expiresAt,
        });
        return { accessToken, refreshToken };
    }
    parseExpiresIn(expiresIn) {
        const value = expiresIn.trim();
        const match = value.match(/^(\d+)([smhd])$/i);
        if (!match)
            return 7 * 24 * 60 * 60 * 1000;
        const amount = Number(match[1]);
        const unit = match[2].toLowerCase();
        const multipliers = {
            s: 1000,
            m: 60 * 1000,
            h: 60 * 60 * 1000,
            d: 24 * 60 * 60 * 1000,
        };
        return amount * (multipliers[unit] || multipliers.d);
    }
    async register(dto) {
        const exists = await this.userModel
            .findOne({ email: dto.email, ...(0, soft_delete_helper_1.softDeleteCondition)(false) })
            .lean();
        if (exists) {
            throw new common_1.BadRequestException('El email ya está registrado');
        }
        const user = await this.userModel.create({
            email: dto.email,
            password: dto.password,
            role: 'user',
        });
        await this.personModel.create({ userId: user._id });
        const tokens = await this.generateTokens(user);
        const safeUser = await this.userModel.findById(user._id);
        return { data: { ...tokens, user: safeUser }, message: 'Registro exitoso' };
    }
    async login(dto) {
        const user = await this.userModel
            .findOne({ email: dto.email, ...(0, soft_delete_helper_1.softDeleteCondition)(false) })
            .select('+password');
        if (!user) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        const isMatch = await bcrypt.compare(dto.password, user.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        const tokens = await this.generateTokens(user);
        const safeUser = await this.userModel.findById(user._id);
        return { data: { ...tokens, user: safeUser }, message: 'Login exitoso' };
    }
    async refresh(refreshToken) {
        if (!refreshToken) {
            throw new common_1.UnauthorizedException('Refresh token requerido');
        }
        const stored = await this.refreshTokenModel.findOne({ token: refreshToken });
        if (!stored || stored.isRevoked) {
            throw new common_1.UnauthorizedException('Refresh token inválido');
        }
        if (stored.expiresAt < new Date()) {
            throw new common_1.UnauthorizedException('Refresh token expirado');
        }
        const payload = await this.jwtService.verifyAsync(refreshToken, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
        });
        const user = await this.userModel.findById(payload.sub);
        if (!user) {
            throw new common_1.UnauthorizedException('Usuario no encontrado');
        }
        stored.isRevoked = true;
        await stored.save();
        const tokens = await this.generateTokens(user);
        const safeUser = await this.userModel.findById(user._id);
        return { data: { ...tokens, user: safeUser }, message: 'Token renovado' };
    }
    async logout(userId) {
        await this.refreshTokenModel.updateMany({ userId, isRevoked: false }, { $set: { isRevoked: true } });
        return { data: true, message: 'Sesión cerrada' };
    }
    async getProfile(userId) {
        const user = await this.userModel
            .findById(userId)
            .select('-password');
        if (!user) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        const person = await this.personModel.findOne({ userId });
        return { data: { ...user.toObject(), person }, message: 'Perfil obtenido' };
    }
    async updateProfile(userId, dto) {
        const person = await this.personModel.findOne({ userId });
        if (!person) {
            throw new common_1.NotFoundException('Perfil no encontrado');
        }
        Object.assign(person, {
            ...dto,
            birthday: dto.birthday ? new Date(dto.birthday) : person.birthday,
        });
        await person.save();
        return { data: person, message: 'Perfil actualizado' };
    }
    async changePassword(userId, dto) {
        const user = await this.userModel
            .findById(userId)
            .select('+password');
        if (!user) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        const isMatch = await bcrypt.compare(dto.currentPassword, user.password);
        if (!isMatch) {
            throw new common_1.ForbiddenException('Contraseña actual incorrecta');
        }
        user.password = dto.newPassword;
        await user.save();
        return { data: true, message: 'Contraseña actualizada' };
    }
    async forgotPassword(dto) {
        const user = await this.userModel.findOne({ email: dto.email });
        if (!user) {
            return {
                data: true,
                message: 'Si el email existe, recibirás instrucciones',
            };
        }
        return {
            data: true,
            message: 'Si el email existe, recibirás instrucciones',
        };
    }
    async resetPassword(dto) {
        if (!dto.token) {
            throw new common_1.BadRequestException('Token requerido');
        }
        return { data: true, message: 'Contraseña restablecida' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(person_schema_1.Person.name)),
    __param(2, (0, mongoose_1.InjectModel)(refresh_token_schema_1.RefreshToken.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map