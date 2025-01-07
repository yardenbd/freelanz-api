import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'user',
        protoPath: 'libs/proto/user.proto', // Path to proto file in the source directory
        url: 'localhost:3001',
      },
    },
  );

  await grpcApp.listen();
  console.log('User microservice is running good');
}
bootstrap();
