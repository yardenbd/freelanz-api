import { status } from '@grpc/grpc-js';
import { RpcException } from '@nestjs/microservices';

export class Util {
  static generateRpcError(err: { code?: number; message?: string }) {
    return new RpcException({
      code: err.code || status.INTERNAL,
      message: err.message || 'Something went wrong',
    });
  }

  static buildCustomError(err: { code: number; message: string }) {
    return Object.assign(new Error(), err);
  }
}
