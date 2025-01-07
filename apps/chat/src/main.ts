import { NestFactory } from '@nestjs/core';
import { ChatModule } from './chat.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const kafkaApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    ChatModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'chat-consumer-group',
        },
      },
    },
  );
  await kafkaApp.listen();
  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    ChatModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'chat',
        protoPath: 'libs/proto/chat.proto', // Path to proto file in the source directory
        url: 'localhost:3006',
      },
    },
  );

  await grpcApp.listen();
  console.log('Chat microservice running good');
}
bootstrap();
