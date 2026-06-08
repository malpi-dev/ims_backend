import { Model } from 'mongoose';
import { Attribute } from '../schemas/attribute.schema';
import { CreateAttributeDto } from '../dto/create-attribute.dto';
import { UpdateAttributeDto } from '../dto/update-attribute.dto';
import { PaginatedResult } from '../../../common/interfaces/pagination.interface';
export declare class AttributesService {
    private readonly attributeModel;
    constructor(attributeModel: Model<Attribute>);
    findAll(params: {
        search?: string;
        page?: number;
        limit?: number;
        includeDeleted?: boolean;
    }): Promise<PaginatedResult<Attribute>>;
    create(dto: CreateAttributeDto): Promise<import("mongoose").Document<unknown, {}, Attribute, {}, {}> & Attribute & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Attribute, {}, {}> & Attribute & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    update(id: string, dto: UpdateAttributeDto): Promise<import("mongoose").Document<unknown, {}, Attribute, {}, {}> & Attribute & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        data: boolean;
        message: string;
    }>;
}
