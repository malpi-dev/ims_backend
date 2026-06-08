import { BaseSchema } from '../../../common/schemas/base.schema';
export declare class ProductAttributeValue extends BaseSchema {
    productId: string;
    attributeId: string;
    valueString: string | null;
    valueNumber: number | null;
    valueBoolean: boolean | null;
    valueDate: Date | null;
    valueJson: unknown | null;
    valueEnum: string | null;
}
export declare const ProductAttributeValueSchema: import("mongoose").Schema<ProductAttributeValue, import("mongoose").Model<ProductAttributeValue, any, any, any, import("mongoose").Document<unknown, any, ProductAttributeValue, any, {}> & ProductAttributeValue & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ProductAttributeValue, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ProductAttributeValue>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<ProductAttributeValue> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
