import { Model } from 'mongoose';
import { Model as InventoryModel } from '../schemas/model.schema';
import { CreateModelDto } from '../dto/create-model.dto';
import { UpdateModelDto } from '../dto/update-model.dto';
import { PaginatedResult } from '../../../common/interfaces/pagination.interface';
export declare class ModelsService {
    private readonly modelModel;
    constructor(modelModel: Model<InventoryModel>);
    findAll(params: {
        search?: string;
        page?: number;
        limit?: number;
        includeDeleted?: boolean;
        brandId?: string;
    }): Promise<PaginatedResult<InventoryModel>>;
    create(dto: CreateModelDto): Promise<import("mongoose").Document<unknown, {}, InventoryModel, {}, {}> & InventoryModel & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, InventoryModel, {}, {}> & InventoryModel & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    update(id: string, dto: UpdateModelDto): Promise<import("mongoose").Document<unknown, {}, InventoryModel, {}, {}> & InventoryModel & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        data: boolean;
        message: string;
    }>;
}
