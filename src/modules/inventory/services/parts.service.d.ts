import { Model } from 'mongoose';
import { Part } from '../schemas/part.schema';
import { CreatePartDto } from '../dto/create-part.dto';
import { UpdatePartDto } from '../dto/update-part.dto';
import { PaginatedResult } from '../../../common/interfaces/pagination.interface';
export declare class PartsService {
    private readonly partModel;
    constructor(partModel: Model<Part>);
    findAll(params: {
        search?: string;
        page?: number;
        limit?: number;
        includeDeleted?: boolean;
        partType?: string;
    }): Promise<PaginatedResult<Part>>;
    create(dto: CreatePartDto): Promise<import("mongoose").Document<unknown, {}, Part, {}, {}> & Part & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Part, {}, {}> & Part & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    update(id: string, dto: UpdatePartDto): Promise<import("mongoose").Document<unknown, {}, Part, {}, {}> & Part & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        data: boolean;
        message: string;
    }>;
}
