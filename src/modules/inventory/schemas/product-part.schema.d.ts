import { BaseSchema } from '../../../common/schemas/base.schema';
export declare class ProductPart extends BaseSchema {
    productId: string;
    partId: string;
    folio: string | null;
    status: string;
    assignedAt: Date;
    notes: string;
}
export declare const ProductPartSchema: import("mongoose").Schema<ProductPart, import("mongoose").Model<ProductPart, any, any, any, import("mongoose").Document<unknown, any, ProductPart, any, {}> & ProductPart & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ProductPart, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ProductPart>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<ProductPart> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
