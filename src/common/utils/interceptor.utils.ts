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
export class ResponseInterceptor
    implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<any> {
        const ctx = context.switchToHttp();

        const request =
            ctx.getRequest<Request>();

        return next.handle().pipe(
            map((res: any) => {
                const isPagination =
                    res?.pagination !== undefined;

                return {
                    success: true,
                    message: 'Success',

                    data: isPagination
                        ? res.data
                        : res,

                    pagination: isPagination
                        ? res.pagination
                        : null,

                    code: HttpStatus.OK,

                    timestamp:
                        new Date().toISOString(),

                    path: request.url,
                };
            }),
        );
    }
}