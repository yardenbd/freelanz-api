import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { status } from '@grpc/grpc-js';

@Catch()
export class GrpcExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    if (exception.code !== undefined) {
      let httpException: HttpException;

      switch (exception.code) {
        case status.NOT_FOUND:
          httpException = new NotFoundException(
            exception.message || 'Resource not found',
          );
          break;
        case status.UNAUTHENTICATED:
          httpException = new UnauthorizedException(
            exception.message || 'Unauthorized',
          );
          break;
        default:
          httpException = new InternalServerErrorException(
            exception.message || 'Internal server error',
          );
          break;
      }

      const statusCode = httpException.getStatus();
      console.log('statusCode', statusCode);
      return response.status(statusCode).json({
        statusCode,
        message: httpException.message,
        path: request.url,
      });
    }
    response.status(exception.status).json({
      statusCode: exception.status,
      message: exception.response.message,
      path: request.url,
    });
  }
}
