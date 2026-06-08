import { Model } from 'mongoose';
import { User, UserDocument } from '../auth/schemas/user.schema';
import { Person } from '../auth/schemas/person.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { PaginatedResult } from '../../common/interfaces/pagination.interface';
export declare class UsersService {
    private readonly userModel;
    private readonly personModel;
    constructor(userModel: Model<UserDocument>, personModel: Model<Person>);
    findAll(params: {
        search?: string;
        page?: number;
        limit?: number;
        includeDeleted?: boolean;
    }): Promise<PaginatedResult<User>>;
    create(dto: CreateUserDto): Promise<(import("mongoose").Document<unknown, {}, UserDocument, {}, {}> & User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, UserDocument, {}, {}> & User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updateEmail(id: string, dto: UpdateEmailDto): Promise<import("mongoose").Document<unknown, {}, UserDocument, {}, {}> & User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updatePassword(id: string, dto: UpdatePasswordDto): Promise<{
        data: boolean;
        message: string;
    }>;
    updateStatus(currentUserId: string, id: string, dto: UpdateStatusDto): Promise<import("mongoose").Document<unknown, {}, UserDocument, {}, {}> & User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    softDelete(id: string): Promise<{
        data: boolean;
        message: string;
    }>;
}
