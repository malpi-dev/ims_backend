import { BaseSchema } from '../../../common/schemas/base.schema';
export declare class Client extends BaseSchema {
    name: string;
    code: string;
    contactEmail: string;
    contactPhone: string;
    address: string;
    notes: string;
    status: string;
}
export declare const ClientSchema: import("mongoose").Schema<Client, import("mongoose").Model<Client, any, any, any, import("mongoose").Document<unknown, any, Client, any, {}> & Client & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Client, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Client>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Client> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
