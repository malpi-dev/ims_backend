import { Model } from 'mongoose';
import { ProductType } from '../schemas/product-type.schema';
import { CreateProductTypeDto } from '../dto/create-product-type.dto';
import { UpdateProductTypeDto } from '../dto/update-product-type.dto';
import { PaginatedResult } from '../../../common/interfaces/pagination.interface';
export declare class ProductTypesService {
    private readonly productTypeModel;
    constructor(productTypeModel: Model<ProductType>);
    findAll(params: {
        search?: string;
        page?: number;
        limit?: number;
        includeDeleted?: boolean;
    }): Promise<PaginatedResult<ProductType>>;
    create(dto: CreateProductTypeDto): Promise<import("mongoose").Document<unknown, {}, ProductType, {}, {}> & ProductType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, ProductType, {}, {}> & ProductType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    update(id: string, dto: UpdateProductTypeDto): Promise<import("mongoose").Document<unknown, {}, ProductType, {}, {}> & ProductType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        data: boolean;
        message: string;
    }>;
}
