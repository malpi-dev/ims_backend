import { BaseSchema } from '../../../common/schemas/base.schema';
export declare class Brand extends BaseSchema {
    name: string;
    code: string;
}
export declare const BrandSchema: import("mongoose").Schema<Brand, import("mongoose").Model<Brand, any, any, any, import("mongoose").Document<unknown, any, Brand, any, {}> & Brand & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Brand, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Brand>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Brand> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
