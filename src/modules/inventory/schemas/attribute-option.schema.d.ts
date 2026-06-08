import { BaseSchema } from '../../../common/schemas/base.schema';
export declare class AttributeOption extends BaseSchema {
    attributeId: string;
    label: string;
    value: string;
}
export declare const AttributeOptionSchema: import("mongoose").Schema<AttributeOption, import("mongoose").Model<AttributeOption, any, any, any, import("mongoose").Document<unknown, any, AttributeOption, any, {}> & AttributeOption & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AttributeOption, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<AttributeOption>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<AttributeOption> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
