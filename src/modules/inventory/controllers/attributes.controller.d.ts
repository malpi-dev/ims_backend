import { CreateAttributeDto } from '../dto/create-attribute.dto';
import { UpdateAttributeDto } from '../dto/update-attribute.dto';
import { CreateAttributeOptionDto } from '../dto/create-attribute-option.dto';
import { AttributesService } from '../services/attributes.service';
import { AttributeOptionsService } from '../services/attribute-options.service';
export declare class AttributesController {
    private readonly attributesService;
    private readonly attributeOptionsService;
    constructor(attributesService: AttributesService, attributeOptionsService: AttributeOptionsService);
    list(search?: string, page?: number, limit?: number, includeDeleted?: boolean): Promise<import("../../../common/interfaces/pagination.interface").PaginatedResult<import("../schemas/attribute.schema").Attribute>>;
    create(dto: CreateAttributeDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/attribute.schema").Attribute, {}, {}> & import("../schemas/attribute.schema").Attribute & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    get(id: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/attribute.schema").Attribute, {}, {}> & import("../schemas/attribute.schema").Attribute & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    update(id: string, dto: UpdateAttributeDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/attribute.schema").Attribute, {}, {}> & import("../schemas/attribute.schema").Attribute & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        data: boolean;
        message: string;
    }>;
    listOptions(attributeId: string, page?: number, limit?: number): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("../schemas/attribute-option.schema").AttributeOption, {}, {}> & import("../schemas/attribute-option.schema").AttributeOption & {
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
    createOption(attributeId: string, dto: CreateAttributeOptionDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/attribute-option.schema").AttributeOption, {}, {}> & import("../schemas/attribute-option.schema").AttributeOption & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateOption(attributeId: string, id: string, dto: CreateAttributeOptionDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/attribute-option.schema").AttributeOption, {}, {}> & import("../schemas/attribute-option.schema").AttributeOption & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    removeOption(attributeId: string, id: string): Promise<{
        data: boolean;
        message: string;
    }>;
}
