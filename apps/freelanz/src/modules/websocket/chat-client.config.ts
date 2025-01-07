import { ClientProviderOptions, Transport } from '@nestjs/microservices';

const url = process.env.CHAT_CLIENT_GRPC_URL || 'localhost:3006';

export const CHAT_CONFIG: ClientProviderOptions = {
  name: 'CHAT_PACKAGE',
  transport: Transport.GRPC,
  options: {
    package: 'chat',
    protoPath: 'libs/proto/chat.proto', // Path to proto file in the source directory
    url,
  },
};
