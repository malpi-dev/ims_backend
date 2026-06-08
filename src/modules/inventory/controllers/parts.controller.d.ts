import { CreatePartDto } from '../dto/create-part.dto';
import { UpdatePartDto } from '../dto/update-part.dto';
import { PartsService } from '../services/parts.service';
export declare class PartsController {
    private readonly partsService;
    constructor(partsService: PartsService);
    list(search?: string, page?: number, limit?: number, includeDeleted?: boolean, partType?: string): Promise<import("../../../common/interfaces/pagination.interface").PaginatedResult<import("../schemas/part.schema").Part>>;
    create(dto: CreatePartDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/part.schema").Part, {}, {}> & import("../schemas/part.schema").Part & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    get(id: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/part.schema").Part, {}, {}> & import("../schemas/part.schema").Part & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    update(id: string, dto: UpdatePartDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/part.schema").Part, {}, {}> & import("../schemas/part.schema").Part & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        data: boolean;
        message: string;
    }>;
}
