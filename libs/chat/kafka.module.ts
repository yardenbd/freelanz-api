import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaProducerService } from './kafka-producer.service';
const url = process.env.CHAT_CLIENT_URL || 'localhost:9092';

@Module({})
export class KafkaModule {
  static register(clientId: string, groupId: string): DynamicModule {
    return {
      module: KafkaModule,
      imports: [
        ClientsModule.register([
          {
            name: 'CHAT_KAFKA',
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: clientId,
                brokers: [url], // Kafka brokers
              },
              consumer: {
                groupId: groupId,
              },
            },
          },
        ]),
      ],
      providers: [KafkaProducerService],
      exports: [KafkaProducerService],
    };
  }
}
