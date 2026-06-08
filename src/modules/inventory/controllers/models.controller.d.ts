import { CreateModelDto } from '../dto/create-model.dto';
import { UpdateModelDto } from '../dto/update-model.dto';
import { ModelsService } from '../services/models.service';
export declare class ModelsController {
    private readonly modelsService;
    constructor(modelsService: ModelsService);
    list(search?: string, page?: number, limit?: number, includeDeleted?: boolean, brandId?: string): Promise<import("../../../common/interfaces/pagination.interface").PaginatedResult<import("../schemas/model.schema").Model>>;
    create(dto: CreateModelDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/model.schema").Model, {}, {}> & import("../schemas/model.schema").Model & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    get(id: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/model.schema").Model, {}, {}> & import("../schemas/model.schema").Model & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    update(id: string, dto: UpdateModelDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/model.schema").Model, {}, {}> & import("../schemas/model.schema").Model & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        data: boolean;
        message: string;
    }>;
}
