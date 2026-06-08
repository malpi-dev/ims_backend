import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('IMS Backend API')
  .setDescription('Inventory & Management System - Backend API')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
