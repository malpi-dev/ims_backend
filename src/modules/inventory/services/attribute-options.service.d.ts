import { Model } from 'mongoose';
import { AttributeOption } from '../schemas/attribute-option.schema';
import { CreateAttributeOptionDto } from '../dto/create-attribute-option.dto';
export declare class AttributeOptionsService {
    private readonly optionModel;
    constructor(optionModel: Model<AttributeOption>);
    list(attributeId: string, params: {
        page?: number;
        limit?: number;
    }): Promise<{
        data: (import("mongoose").Document<unknown, {}, AttributeOption, {}, {}> & AttributeOption & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    create(attributeId: string, dto: CreateAttributeOptionDto): Promise<import("mongoose").Document<unknown, {}, AttributeOption, {}, {}> & AttributeOption & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    update(attributeId: string, id: string, dto: CreateAttributeOptionDto): Promise<import("mongoose").Document<unknown, {}, AttributeOption, {}, {}> & AttributeOption & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    remove(attributeId: string, id: string): Promise<{
        data: boolean;
        message: string;
    }>;
}
