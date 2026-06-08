import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { AssignPartDto } from '../dto/assign-part.dto';
import { UpdateAttributeValueDto } from '../dto/update-attribute-value.dto';
import { ProductsService } from '../services/products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    list(search?: string, page?: number, limit?: number, includeDeleted?: boolean, status?: string, productTypeId?: string, modelId?: string): Promise<import("../../../common/interfaces/pagination.interface").PaginatedResult<import("../schemas/product.schema").Product>>;
    create(dto: CreateProductDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/product.schema").Product, {}, {}> & import("../schemas/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    lookup(inventoryCode: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/product.schema").Product, {}, {}> & import("../schemas/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    get(id: string): Promise<{
        attributes: (import("mongoose").Document<unknown, {}, import("../schemas/product-attribute-value.schema").ProductAttributeValue, {}, {}> & import("../schemas/product-attribute-value.schema").ProductAttributeValue & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        parts: (import("mongoose").Document<unknown, {}, import("../schemas/product-part.schema").ProductPart, {}, {}> & import("../schemas/product-part.schema").ProductPart & {
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
    update(id: string, dto: UpdateProductDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/product.schema").Product, {}, {}> & import("../schemas/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        data: boolean;
        message: string;
    }>;
    assignPart(id: string, dto: AssignPartDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/product-part.schema").ProductPart, {}, {}> & import("../schemas/product-part.schema").ProductPart & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateAttributes(id: string, dto: UpdateAttributeValueDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/product-attribute-value.schema").ProductAttributeValue, {}, {}> & import("../schemas/product-attribute-value.schema").ProductAttributeValue & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
