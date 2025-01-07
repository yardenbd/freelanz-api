import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { JobModule } from './job.module';

async function bootstrap() {
  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    JobModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'job',
        protoPath: 'libs/proto/job.proto', // Path to proto file in the source directory
        url: 'localhost:3003',
      },
    },
  );

  await grpcApp.listen();
  console.log('Job microservice is running');
}
bootstrap();
