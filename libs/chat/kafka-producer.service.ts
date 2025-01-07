import {
  Injectable,
  Inject,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class KafkaProducerService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject('CHAT_KAFKA') private readonly kafkaClient: ClientKafka,
  ) {}

  async sendMessage(topic: string, message: any): Promise<void> {
    return firstValueFrom(
      this.kafkaClient.emit(topic, JSON.stringify(message)),
    );
  }

  async onModuleInit(): Promise<void> {
    await this.kafkaClient.connect();
    console.log('Kafka Producer connected');
  }

  async onModuleDestroy(): Promise<void> {
    await this.kafkaClient.close();
    console.log('Kafka Producer disconnected');
  }
}
