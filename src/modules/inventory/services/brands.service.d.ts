import { Model } from 'mongoose';
import { Brand } from '../schemas/brand.schema';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';
import { PaginatedResult } from '../../../common/interfaces/pagination.interface';
export declare class BrandsService {
    private readonly brandModel;
    constructor(brandModel: Model<Brand>);
    findAll(params: {
        search?: string;
        page?: number;
        limit?: number;
        includeDeleted?: boolean;
    }): Promise<PaginatedResult<Brand>>;
    create(dto: CreateBrandDto): Promise<import("mongoose").Document<unknown, {}, Brand, {}, {}> & Brand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Brand, {}, {}> & Brand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    update(id: string, dto: UpdateBrandDto): Promise<import("mongoose").Document<unknown, {}, Brand, {}, {}> & Brand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        data: boolean;
        message: string;
    }>;
}
