import { CreateBrandDto } from '../dto/create-brand.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';
import { BrandsService } from '../services/brands.service';
export declare class BrandsController {
    private readonly brandsService;
    constructor(brandsService: BrandsService);
    list(search?: string, page?: number, limit?: number, includeDeleted?: boolean): Promise<import("../../../common/interfaces/pagination.interface").PaginatedResult<import("../schemas/brand.schema").Brand>>;
    create(dto: CreateBrandDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/brand.schema").Brand, {}, {}> & import("../schemas/brand.schema").Brand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    get(id: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/brand.schema").Brand, {}, {}> & import("../schemas/brand.schema").Brand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    update(id: string, dto: UpdateBrandDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/brand.schema").Brand, {}, {}> & import("../schemas/brand.schema").Brand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        data: boolean;
        message: string;
    }>;
}
