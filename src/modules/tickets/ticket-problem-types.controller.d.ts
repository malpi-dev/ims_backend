import { TicketsService } from './tickets.service';
import { CreateTicketProblemTypeDto, UpdateTicketProblemTypeDto } from './dto/problem-type.dto';
export declare class TicketProblemTypesController {
    private readonly ticketsService;
    constructor(ticketsService: TicketsService);
    list(productTypeId?: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/ticket-problem-type.schema").TicketProblemType, {}, {}> & import("./schemas/ticket-problem-type.schema").TicketProblemType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    create(dto: CreateTicketProblemTypeDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/ticket-problem-type.schema").TicketProblemType, {}, {}> & import("./schemas/ticket-problem-type.schema").TicketProblemType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    update(id: string, dto: UpdateTicketProblemTypeDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/ticket-problem-type.schema").TicketProblemType, {}, {}> & import("./schemas/ticket-problem-type.schema").TicketProblemType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        data: boolean;
        message: string;
    }>;
}
