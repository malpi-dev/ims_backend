import { BaseSchema } from '../../../common/schemas/base.schema';
export declare class ProductType extends BaseSchema {
    name: string;
    code: string;
}
export declare const ProductTypeSchema: import("mongoose").Schema<ProductType, import("mongoose").Model<ProductType, any, any, any, import("mongoose").Document<unknown, any, ProductType, any, {}> & ProductType & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ProductType, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ProductType>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<ProductType> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
