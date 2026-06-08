"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerConfig = void 0;
const swagger_1 = require("@nestjs/swagger");
exports.swaggerConfig = new swagger_1.DocumentBuilder()
    .setTitle('IMS Backend API')
    .setDescription('Inventory & Management System - Backend API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
//# sourceMappingURL=swagger.config.js.map