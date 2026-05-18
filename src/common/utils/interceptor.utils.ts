import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpStatus,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from 'express';

// success response global
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();

    const request = ctx.getRequest<Request>();

    return next.handle().pipe(
      map((res: any) => {

        return {
          success: true,
          message: 'Success',

          data: res?.data ?? res,

          // conditional spreading
          ...(res?.pagination && {
            pagination: res.pagination,
          }),

          // conditional spreading
          ...(res?.meta && {
            meta: res.meta,
          }),

          code: HttpStatus.OK,

          timestamp: new Date().toISOString(),

          path: request.url,
        };
      }),
    );
  }
}
