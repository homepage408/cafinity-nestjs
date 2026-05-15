import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';

import { Request, Response } from 'express';

import {
    PrismaClientKnownRequestError,
} from '@prisma/client/runtime/library';

// error handler global
@Catch()
export class GlobalExceptionFilter
    implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();

        const response =
            ctx.getResponse<Response>();

        const request =
            ctx.getRequest<Request>();

        let status =
            HttpStatus.INTERNAL_SERVER_ERROR;

        let message = 'Internal server error';

        /*
          Prisma Error
        */
        if (
            exception instanceof
            PrismaClientKnownRequestError
        ) {
            switch (exception.code) {
                case 'P2002':
                    status = HttpStatus.CONFLICT;
                    message = 'Data already exists';
                    break;

                case 'P2025':
                    status = HttpStatus.NOT_FOUND;
                    message = 'Data not found';
                    break;

                default:
                    status =
                        HttpStatus.INTERNAL_SERVER_ERROR;

                    message = 'Database error';
            }

            return response.status(status).json({
                success: false,
                message,
                data: null,
                code: status,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
        }

        /*
          NestJS HttpException
        */
        if (exception instanceof HttpException) {
            status = exception.getStatus();

            const exceptionResponse =
                exception.getResponse();

            if (
                typeof exceptionResponse === 'string'
            ) {
                message = exceptionResponse;
            } else if (
                typeof exceptionResponse === 'object'
            ) {
                const res = exceptionResponse as any;

                /*
                  ValidationPipe biasanya array
                */
                if (Array.isArray(res.message)) {
                    message = res.message[0];
                } else {
                    message = res.message || message;
                }
            }

            return response.status(status).json({
                success: false,
                message,
                data: null,
                code: status,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
        }

        /*
          Unknown Error
        */
        console.error(exception);

        return response.status(status).json({
            success: false,
            message,
            data: null,
            code: status,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}