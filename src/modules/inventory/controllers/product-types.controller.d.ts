import { CreateProductTypeDto } from '../dto/create-product-type.dto';
import { UpdateProductTypeDto } from '../dto/update-product-type.dto';
import { ProductTypesService } from '../services/product-types.service';
export declare class ProductTypesController {
    private readonly productTypesService;
    constructor(productTypesService: ProductTypesService);
    list(search?: string, page?: number, limit?: number, includeDeleted?: boolean): Promise<import("../../../common/interfaces/pagination.interface").PaginatedResult<import("../schemas/product-type.schema").ProductType>>;
    create(dto: CreateProductTypeDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/product-type.schema").ProductType, {}, {}> & import("../schemas/product-type.schema").ProductType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    get(id: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/product-type.schema").ProductType, {}, {}> & import("../schemas/product-type.schema").ProductType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    update(id: string, dto: UpdateProductTypeDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/product-type.schema").ProductType, {}, {}> & import("../schemas/product-type.schema").ProductType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        data: boolean;
        message: string;
    }>;
}
