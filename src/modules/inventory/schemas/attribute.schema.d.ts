import { BaseSchema } from '../../../common/schemas/base.schema';
export declare class Attribute extends BaseSchema {
    name: string;
    code: string;
    valueType: string;
}
export declare const AttributeSchema: import("mongoose").Schema<Attribute, import("mongoose").Model<Attribute, any, any, any, import("mongoose").Document<unknown, any, Attribute, any, {}> & Attribute & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Attribute, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Attribute>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Attribute> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
