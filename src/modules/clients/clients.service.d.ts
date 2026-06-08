import { Model } from 'mongoose';
import { Client } from './schemas/client.schema';
import { Area } from './schemas/area.schema';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { PaginatedResult } from '../../common/interfaces/pagination.interface';
export declare class ClientsService {
    private readonly clientModel;
    private readonly areaModel;
    constructor(clientModel: Model<Client>, areaModel: Model<Area>);
    findAll(params: {
        search?: string;
        page?: number;
        limit?: number;
        includeDeleted?: boolean;
    }): Promise<PaginatedResult<Client>>;
    create(dto: CreateClientDto): Promise<import("mongoose").Document<unknown, {}, Client, {}, {}> & Client & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Client, {}, {}> & Client & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    update(id: string, dto: UpdateClientDto): Promise<import("mongoose").Document<unknown, {}, Client, {}, {}> & Client & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        data: boolean;
        message: string;
    }>;
    listAreas(clientId: string, params: {
        search?: string;
        page?: number;
        limit?: number;
        includeDeleted?: boolean;
    }): Promise<PaginatedResult<Area>>;
    createArea(clientId: string, dto: CreateAreaDto): Promise<import("mongoose").Document<unknown, {}, Area, {}, {}> & Area & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getArea(clientId: string, id: string): Promise<import("mongoose").Document<unknown, {}, Area, {}, {}> & Area & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateArea(clientId: string, id: string, dto: UpdateAreaDto): Promise<import("mongoose").Document<unknown, {}, Area, {}, {}> & Area & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    removeArea(clientId: string, id: string): Promise<{
        data: boolean;
        message: string;
    }>;
}
