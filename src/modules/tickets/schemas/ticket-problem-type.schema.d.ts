import { BaseSchema } from '../../../common/schemas/base.schema';
export declare class TicketProblemType extends BaseSchema {
    productTypeId: string;
    name: string;
    description: string;
}
export declare const TicketProblemTypeSchema: import("mongoose").Schema<TicketProblemType, import("mongoose").Model<TicketProblemType, any, any, any, import("mongoose").Document<unknown, any, TicketProblemType, any, {}> & TicketProblemType & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TicketProblemType, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<TicketProblemType>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<TicketProblemType> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
