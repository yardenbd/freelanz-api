import { ClientProviderOptions, Transport } from '@nestjs/microservices';
const url = process.env.AUTH_CLIENT_URL || 'localhost:3002';

export const AUTH_CONFIG: ClientProviderOptions = {
  name: 'AUTH_PACKAGE',
  transport: Transport.GRPC,
  options: {
    package: 'auth',
    protoPath: 'libs/proto/auth.proto', // Path to proto file in the source directory
    url,
  },
};
