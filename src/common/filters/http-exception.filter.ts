import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { MongoError } from 'mongodb';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = 500;
    let message = 'Error interno del servidor';
    let error = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exResponse = exception.getResponse();
      if (typeof exResponse === 'string') {
        message = exResponse;
      } else {
        const exObj = exResponse as any;
        message = Array.isArray(exObj.message)
          ? exObj.message.join(', ')
          : exObj.message;
        error = exObj.error || exception.name;
      }
    } else if (exception instanceof MongoError) {
      if (exception.code === 11000) {
        status = 409;
        message = 'El recurso ya existe (duplicado)';
        error = 'Conflict';
      }
    }

    response.status(status).json({ statusCode: status, message, error });
  }
}
