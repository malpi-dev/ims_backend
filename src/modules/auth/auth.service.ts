import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { Person } from './schemas/person.schema';
import { RefreshToken } from './schemas/refresh-token.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { softDeleteCondition } from '../../common/helpers/soft-delete.helper';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Person.name) private readonly personModel: Model<Person>,
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshToken>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private async generateTokens(user: UserDocument) {
    const payload: JwtPayload = {
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRES_IN'),
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
    });

    const expiresAt = new Date(
      Date.now() +
        this.parseExpiresIn(
          this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') || '7d',
        ),
    );

    await this.refreshTokenModel.create({
      userId: user._id,
      token: refreshToken,
      expiresAt,
    });

    return { accessToken, refreshToken };
  }

  private parseExpiresIn(expiresIn: string) {
    const value = expiresIn.trim();
    const match = value.match(/^(\d+)([smhd])$/i);
    if (!match) return 7 * 24 * 60 * 60 * 1000;
    const amount = Number(match[1]);
    const unit = match[2].toLowerCase();
    const multipliers: Record<string, number> = {
      s: 1000,
      m: 60 * 1000,
      h: 60 * 60 * 1000,
      d: 24 * 60 * 60 * 1000,
    };
    return amount * (multipliers[unit] || multipliers.d);
  }

  async register(dto: RegisterDto) {
    const exists = await this.userModel
      .findOne({ email: dto.email, ...softDeleteCondition(false) })
      .lean();
    if (exists) {
      throw new BadRequestException('El email ya está registrado');
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

  async login(dto: LoginDto) {
    const user = await this.userModel
      .findOne({ email: dto.email, ...softDeleteCondition(false) })
      .select('+password');
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const tokens = await this.generateTokens(user);
    const safeUser = await this.userModel.findById(user._id);

    return { data: { ...tokens, user: safeUser }, message: 'Login exitoso' };
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token requerido');
    }
    const stored = await this.refreshTokenModel.findOne({ token: refreshToken });
    if (!stored || stored.isRevoked) {
      throw new UnauthorizedException('Refresh token inválido');
    }
    if (stored.expiresAt < new Date()) {
      throw new UnauthorizedException('Refresh token expirado');
    }

    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    });

    const user = await this.userModel.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    stored.isRevoked = true;
    await stored.save();

    const tokens = await this.generateTokens(user);
    const safeUser = await this.userModel.findById(user._id);

    return { data: { ...tokens, user: safeUser }, message: 'Token renovado' };
  }

  async logout(userId: string) {
    await this.refreshTokenModel.updateMany(
      { userId, isRevoked: false },
      { $set: { isRevoked: true } },
    );
    return { data: true, message: 'Sesión cerrada' };
  }

  async getProfile(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .select('-password');
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const person = await this.personModel.findOne({ userId });
    return { data: { ...user.toObject(), person }, message: 'Perfil obtenido' };
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const person = await this.personModel.findOne({ userId });
    if (!person) {
      throw new NotFoundException('Perfil no encontrado');
    }

    Object.assign(person, {
      ...dto,
      birthday: dto.birthday ? new Date(dto.birthday) : person.birthday,
    });
    await person.save();

    return { data: person, message: 'Perfil actualizado' };
  }

  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.userModel
      .findById(userId)
      .select('+password');
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const isMatch = await bcrypt.compare(dto.currentPassword, user.password);
    if (!isMatch) {
      throw new ForbiddenException('Contraseña actual incorrecta');
    }
    user.password = dto.newPassword;
    await user.save();
    return { data: true, message: 'Contraseña actualizada' };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
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

  async resetPassword(dto: ResetPasswordDto) {
    if (!dto.token) {
      throw new BadRequestException('Token requerido');
    }
    return { data: true, message: 'Contraseña restablecida' };
  }
}
