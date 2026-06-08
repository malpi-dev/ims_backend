import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Response<T> {
  data: T;
  message?: string;
  meta?: unknown;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        if (data && data.data !== undefined && data.meta !== undefined) {
          return {
            message: data.message || 'Listado obtenido exitosamente',
            ...data,
          };
        }
        if (Array.isArray(data)) {
          return { data, message: 'Listado obtenido exitosamente' };
        }
        if (data && data.message) {
          return data;
        }
        return { data, message: 'Operación exitosa' };
      }),
    );
  }
}
