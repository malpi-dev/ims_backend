import { ConfigService } from '@nestjs/config';
export declare class FilesService {
    private readonly configService;
    constructor(configService: ConfigService);
    upload(file: Express.Multer.File): Promise<unknown>;
}
