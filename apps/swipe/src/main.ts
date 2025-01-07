import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { SwipeModule } from './swipe.module';

async function bootstrap() {
  const kafkaApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    SwipeModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'swipes-consumer-group',
        },
      },
    },
  );
  await kafkaApp.listen();
  console.log('Swipe microservice is running');
}
bootstrap();
