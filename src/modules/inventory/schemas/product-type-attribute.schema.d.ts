import { BaseSchema } from '../../../common/schemas/base.schema';
export declare class ProductTypeAttribute extends BaseSchema {
    productTypeId: string;
    attributeId: string;
    required: boolean;
}
export declare const ProductTypeAttributeSchema: import("mongoose").Schema<ProductTypeAttribute, import("mongoose").Model<ProductTypeAttribute, any, any, any, import("mongoose").Document<unknown, any, ProductTypeAttribute, any, {}> & ProductTypeAttribute & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ProductTypeAttribute, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ProductTypeAttribute>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<ProductTypeAttribute> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
