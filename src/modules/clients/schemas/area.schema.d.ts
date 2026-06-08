import { BaseSchema } from '../../../common/schemas/base.schema';
export declare class Area extends BaseSchema {
    clientId: string;
    name: string;
    code: string;
    notes: string;
}
export declare const AreaSchema: import("mongoose").Schema<Area, import("mongoose").Model<Area, any, any, any, import("mongoose").Document<unknown, any, Area, any, {}> & Area & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Area, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Area>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Area> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
