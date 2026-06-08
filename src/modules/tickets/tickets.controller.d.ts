import { TicketsService } from './tickets.service';
import { CreatePublicTicketDto } from './dto/create-public-ticket.dto';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { CloseTicketDto } from './dto/close-ticket.dto';
import { TicketQueryDto } from './dto/ticket-query.dto';
export declare class TicketsController {
    private readonly ticketsService;
    constructor(ticketsService: TicketsService);
    createPublic(dto: CreatePublicTicketDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/ticket.schema").Ticket, {}, {}> & import("./schemas/ticket.schema").Ticket & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    create(dto: CreateTicketDto, user: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/ticket.schema").Ticket, {}, {}> & import("./schemas/ticket.schema").Ticket & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    list(query: TicketQueryDto, page?: number, limit?: number): Promise<import("../../common/interfaces/pagination.interface").PaginatedResult<import("./schemas/ticket.schema").Ticket>>;
    report(query: TicketQueryDto): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/ticket.schema").Ticket, {}, {}> & import("./schemas/ticket.schema").Ticket & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    get(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/ticket.schema").Ticket, {}, {}> & import("./schemas/ticket.schema").Ticket & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    take(id: string, user: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/ticket.schema").Ticket, {}, {}> & import("./schemas/ticket.schema").Ticket & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    close(id: string, user: any, dto: CloseTicketDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/ticket.schema").Ticket, {}, {}> & import("./schemas/ticket.schema").Ticket & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    pending(id: string, user: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/ticket.schema").Ticket, {}, {}> & import("./schemas/ticket.schema").Ticket & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    cancel(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/ticket.schema").Ticket, {}, {}> & import("./schemas/ticket.schema").Ticket & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
