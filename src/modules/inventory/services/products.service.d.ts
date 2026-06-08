import { Model } from 'mongoose';
import { Product } from '../schemas/product.schema';
import { ProductAttributeValue } from '../schemas/product-attribute-value.schema';
import { ProductTypeAttribute } from '../schemas/product-type-attribute.schema';
import { Attribute } from '../schemas/attribute.schema';
import { AttributeOption } from '../schemas/attribute-option.schema';
import { ProductPart } from '../schemas/product-part.schema';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { AssignPartDto } from '../dto/assign-part.dto';
import { UpdateAttributeValueDto } from '../dto/update-attribute-value.dto';
import { PaginatedResult } from '../../../common/interfaces/pagination.interface';
export declare class ProductsService {
    private readonly productModel;
    private readonly attributeValueModel;
    private readonly productTypeAttributeModel;
    private readonly attributeModel;
    private readonly optionModel;
    private readonly productPartModel;
    constructor(productModel: Model<Product>, attributeValueModel: Model<ProductAttributeValue>, productTypeAttributeModel: Model<ProductTypeAttribute>, attributeModel: Model<Attribute>, optionModel: Model<AttributeOption>, productPartModel: Model<ProductPart>);
    findAll(params: {
        search?: string;
        page?: number;
        limit?: number;
        includeDeleted?: boolean;
        status?: string;
        productTypeId?: string;
        modelId?: string;
    }): Promise<PaginatedResult<Product>>;
    create(dto: CreateProductDto): Promise<import("mongoose").Document<unknown, {}, Product, {}, {}> & Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findOne(id: string): Promise<{
        attributes: (import("mongoose").Document<unknown, {}, ProductAttributeValue, {}, {}> & ProductAttributeValue & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        parts: (import("mongoose").Document<unknown, {}, ProductPart, {}, {}> & ProductPart & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        inventoryCode: string;
        serialNumber: string | null;
        productTypeId: string;
        modelId: string;
        purchaseDate: Date | null;
        status: string;
        assignedTo: string | null;
        notes: string;
        deletedAt: Date | null;
        _id: import("mongoose").Types.ObjectId;
        __v: number;
    }>;
    update(id: string, dto: UpdateProductDto): Promise<import("mongoose").Document<unknown, {}, Product, {}, {}> & Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        data: boolean;
        message: string;
    }>;
    lookupByInventoryCode(inventoryCode: string): Promise<import("mongoose").Document<unknown, {}, Product, {}, {}> & Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    assignPart(productId: string, dto: AssignPartDto): Promise<import("mongoose").Document<unknown, {}, ProductPart, {}, {}> & ProductPart & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateAttributeValue(productId: string, dto: UpdateAttributeValueDto): Promise<import("mongoose").Document<unknown, {}, ProductAttributeValue, {}, {}> & ProductAttributeValue & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    private normalizeAttributeValue;
}
