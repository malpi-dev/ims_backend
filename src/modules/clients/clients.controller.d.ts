import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
export declare class ClientsController {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
    listClients(search?: string, page?: number, limit?: number, includeDeleted?: boolean): Promise<import("../../common/interfaces/pagination.interface").PaginatedResult<import("./schemas/client.schema").Client>>;
    createClient(dto: CreateClientDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/client.schema").Client, {}, {}> & import("./schemas/client.schema").Client & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getClient(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/client.schema").Client, {}, {}> & import("./schemas/client.schema").Client & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateClient(id: string, dto: UpdateClientDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/client.schema").Client, {}, {}> & import("./schemas/client.schema").Client & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    deleteClient(id: string): Promise<{
        data: boolean;
        message: string;
    }>;
    listAreas(clientId: string, search?: string, page?: number, limit?: number, includeDeleted?: boolean): Promise<import("../../common/interfaces/pagination.interface").PaginatedResult<import("./schemas/area.schema").Area>>;
    createArea(clientId: string, dto: CreateAreaDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/area.schema").Area, {}, {}> & import("./schemas/area.schema").Area & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getArea(clientId: string, id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/area.schema").Area, {}, {}> & import("./schemas/area.schema").Area & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateArea(clientId: string, id: string, dto: UpdateAreaDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/area.schema").Area, {}, {}> & import("./schemas/area.schema").Area & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    deleteArea(clientId: string, id: string): Promise<{
        data: boolean;
        message: string;
    }>;
}
