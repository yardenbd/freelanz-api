import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { WebsocketGateway } from './websocket.gateway';
import { CreateMessageDTO } from '@libs/dto/chat/create-message.dto';

@Injectable()
export class KafkaConsumerService implements OnModuleInit, OnModuleDestroy {
  private readonly kafka = new Kafka({
    clientId: 'api-gateway-client',
    brokers: ['localhost:9092'],
  });

  private readonly consumer = this.kafka.consumer({
    groupId: 'chat-group',
  });

  constructor(private readonly webSocketGateway: WebsocketGateway) {}

  async onModuleInit() {
    await this.consumer.connect();
    await this.consumer.subscribe({
      topic: 'chat.message.received',
      fromBeginning: false,
    });

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        const parsedMessage = JSON.parse(
          message.value.toString(),
        ) as CreateMessageDTO;
        this.webSocketGateway.handleDeliveryNotification(parsedMessage);
      },
    });

    console.log('Kafka Consumer connected');
  }

  async onModuleDestroy() {
    await this.consumer.disconnect();
    console.log('Kafka Consumer disconnected');
  }
}
