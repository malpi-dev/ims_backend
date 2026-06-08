import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../auth/schemas/user.schema';
import { Person } from '../auth/schemas/person.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import {
  softDeleteCondition,
  softDeleteQuery,
} from '../../common/helpers/soft-delete.helper';
import { PaginatedResult } from '../../common/interfaces/pagination.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Person.name) private readonly personModel: Model<Person>,
  ) {}

  async findAll(params: {
    search?: string;
    page?: number;
    limit?: number;
    includeDeleted?: boolean;
  }): Promise<PaginatedResult<User>> {
    const page = Number(params.page) || 1;
    const limit = Math.min(Number(params.limit) || 20, 100);
    const search = params.search?.trim();

    const filter: Record<string, any> = {
      ...softDeleteCondition(params.includeDeleted),
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

  async create(dto: CreateUserDto) {
    const exists = await this.userModel.findOne({
      email: dto.email,
      ...softDeleteCondition(false),
    });
    if (exists) {
      throw new BadRequestException('El email ya está registrado');
    }

    const user = await this.userModel.create({
      email: dto.email,
      password: dto.password,
      role: dto.role,
    });
    await this.personModel.create({ userId: user._id });
    return this.userModel.findById(user._id).select('-password');
  }

  async findOne(id: string) {
    const user = await this.userModel
      .findOne({ _id: id, ...softDeleteCondition(false) })
      .select('-password');
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  async updateEmail(id: string, dto: UpdateEmailDto) {
    const user = await this.userModel
      .findOne({ _id: id, ...softDeleteCondition(false) })
      .select('-password');
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    user.email = dto.email;
    await user.save();
    return user;
  }

  async updatePassword(id: string, dto: UpdatePasswordDto) {
    const user = await this.userModel
      .findOne({ _id: id, ...softDeleteCondition(false) })
      .select('+password');
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    user.password = dto.password;
    await user.save();
    return { data: true, message: 'Contraseña actualizada' };
  }

  async updateStatus(currentUserId: string, id: string, dto: UpdateStatusDto) {
    if (currentUserId === id) {
      throw new ForbiddenException('No puedes banearte a ti mismo');
    }
    const user = await this.userModel
      .findOne({ _id: id, ...softDeleteCondition(false) })
      .select('-password');
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    user.status = dto.status;
    await user.save();
    return user;
  }

  async softDelete(id: string) {
    const user = await this.userModel.findOne({ _id: id, ...softDeleteQuery(false) });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    user.deletedAt = new Date();
    await user.save();
    return { data: true, message: 'Usuario eliminado' };
  }
}
