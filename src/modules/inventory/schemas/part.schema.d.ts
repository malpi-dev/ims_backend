import { BaseSchema } from '../../../common/schemas/base.schema';
export declare class Part extends BaseSchema {
    name: string;
    code: string;
    partType: string;
}
export declare const PartSchema: import("mongoose").Schema<Part, import("mongoose").Model<Part, any, any, any, import("mongoose").Document<unknown, any, Part, any, {}> & Part & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Part, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Part>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Part> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
