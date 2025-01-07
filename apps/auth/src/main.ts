import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'auth',
        protoPath: 'libs/proto/auth.proto', // Reference the moved proto file
        url: 'localhost:3002',
      },
    },
  );
  await grpcApp.listen();
  console.log('Auth microservice running');
}
bootstrap();
