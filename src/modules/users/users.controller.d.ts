import { CreateUserDto } from './dto/create-user.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(search?: string, page?: number, limit?: number, includeDeleted?: boolean): Promise<import("../../common/interfaces/pagination.interface").PaginatedResult<import("../auth/schemas/user.schema").User>>;
    create(dto: CreateUserDto): Promise<(import("mongoose").Document<unknown, {}, import("../auth/schemas/user.schema").UserDocument, {}, {}> & import("../auth/schemas/user.schema").User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("../auth/schemas/user.schema").UserDocument, {}, {}> & import("../auth/schemas/user.schema").User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updateEmail(id: string, dto: UpdateEmailDto): Promise<import("mongoose").Document<unknown, {}, import("../auth/schemas/user.schema").UserDocument, {}, {}> & import("../auth/schemas/user.schema").User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updatePassword(id: string, dto: UpdatePasswordDto): Promise<{
        data: boolean;
        message: string;
    }>;
    updateStatus(user: any, id: string, dto: UpdateStatusDto): Promise<import("mongoose").Document<unknown, {}, import("../auth/schemas/user.schema").UserDocument, {}, {}> & import("../auth/schemas/user.schema").User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
