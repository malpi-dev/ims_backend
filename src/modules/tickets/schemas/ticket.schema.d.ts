import { BaseSchema } from '../../../common/schemas/base.schema';
export declare class Resolution {
    failureCause: string;
    negligence: boolean;
    replacedParts: string[];
    evidenceImage: string;
    resolvedAt: Date;
}
export declare const ResolutionSchema: import("mongoose").Schema<Resolution, import("mongoose").Model<Resolution, any, any, any, import("mongoose").Document<unknown, any, Resolution, any, {}> & Resolution & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Resolution, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Resolution>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Resolution> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class Ticket extends BaseSchema {
    folio: string;
    productId: string;
    reportedBy: string | null;
    reporterName: string | null;
    reporterContact: string | null;
    problemType: string;
    problemDescription: string;
    images: string[];
    status: string;
    assignedTo: string | null;
    assignedAt: Date | null;
    closedAt: Date | null;
    resolution: Resolution | null;
}
export declare const TicketSchema: import("mongoose").Schema<Ticket, import("mongoose").Model<Ticket, any, any, any, import("mongoose").Document<unknown, any, Ticket, any, {}> & Ticket & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Ticket, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Ticket>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Ticket> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
