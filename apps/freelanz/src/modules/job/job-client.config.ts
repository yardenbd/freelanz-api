import { ClientProviderOptions, Transport } from '@nestjs/microservices';
const url = process.env.JOB_CLIENT_URL || 'localhost:3003';

export const JOB_CONFIG: ClientProviderOptions = {
  name: 'JOB_PACKAGE',
  transport: Transport.GRPC,
  options: {
    package: 'job',
    protoPath: 'libs/proto/job.proto', // Path to proto file in the source directory
    url,
  },
};
