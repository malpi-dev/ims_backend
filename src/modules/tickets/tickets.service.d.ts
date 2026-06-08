import { Model } from 'mongoose';
import { Ticket } from './schemas/ticket.schema';
import { TicketProblemType } from './schemas/ticket-problem-type.schema';
import { CreatePublicTicketDto } from './dto/create-public-ticket.dto';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { CloseTicketDto } from './dto/close-ticket.dto';
import { TicketQueryDto } from './dto/ticket-query.dto';
import { CreateTicketProblemTypeDto, UpdateTicketProblemTypeDto } from './dto/problem-type.dto';
import { Product } from '../inventory/schemas/product.schema';
import { PaginatedResult } from '../../common/interfaces/pagination.interface';
export declare class TicketsService {
    private readonly ticketModel;
    private readonly problemTypeModel;
    private readonly productModel;
    private readonly transitions;
    constructor(ticketModel: Model<Ticket>, problemTypeModel: Model<TicketProblemType>, productModel: Model<Product>);
    generateFolio(): Promise<string>;
    createPublic(dto: CreatePublicTicketDto): Promise<import("mongoose").Document<unknown, {}, Ticket, {}, {}> & Ticket & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    create(dto: CreateTicketDto, userId: string): Promise<import("mongoose").Document<unknown, {}, Ticket, {}, {}> & Ticket & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAll(params: {
        query: TicketQueryDto;
        page?: number;
        limit?: number;
    }): Promise<PaginatedResult<Ticket>>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Ticket, {}, {}> & Ticket & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    take(id: string, userId: string): Promise<import("mongoose").Document<unknown, {}, Ticket, {}, {}> & Ticket & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    close(id: string, userId: string, dto: CloseTicketDto): Promise<import("mongoose").Document<unknown, {}, Ticket, {}, {}> & Ticket & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    pending(id: string, userId: string): Promise<import("mongoose").Document<unknown, {}, Ticket, {}, {}> & Ticket & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    cancel(id: string): Promise<import("mongoose").Document<unknown, {}, Ticket, {}, {}> & Ticket & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    report(params: TicketQueryDto): Promise<(import("mongoose").Document<unknown, {}, Ticket, {}, {}> & Ticket & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    listProblemTypes(productTypeId?: string): Promise<(import("mongoose").Document<unknown, {}, TicketProblemType, {}, {}> & TicketProblemType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    createProblemType(dto: CreateTicketProblemTypeDto): Promise<import("mongoose").Document<unknown, {}, TicketProblemType, {}, {}> & TicketProblemType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateProblemType(id: string, dto: UpdateTicketProblemTypeDto): Promise<import("mongoose").Document<unknown, {}, TicketProblemType, {}, {}> & TicketProblemType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    deleteProblemType(id: string): Promise<{
        data: boolean;
        message: string;
    }>;
    private isValidTransition;
}
