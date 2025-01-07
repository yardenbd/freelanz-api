import { ClientProviderOptions, Transport } from '@nestjs/microservices';
const url = process.env.USER_CLIENT_URL || 'localhost:3001';

export const USER_CONFIG: ClientProviderOptions = {
  name: 'USER_PACKAGE',
  transport: Transport.GRPC,
  options: {
    package: 'user',
    protoPath: 'libs/proto/user.proto', // Path to proto file in the source directory
    url,
  },
};
