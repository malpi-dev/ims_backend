import { BaseSchema } from '../../../common/schemas/base.schema';
export declare class Model extends BaseSchema {
    brandId: string;
    name: string;
    code: string;
}
export declare const ModelSchema: import("mongoose").Schema<Model, import("mongoose").Model<Model, any, any, any, import("mongoose").Document<unknown, any, Model, any, {}> & Model & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Model, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Model>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Model> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
