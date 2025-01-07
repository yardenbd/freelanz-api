import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Kafka, Consumer, EachMessagePayload, Producer, Admin } from 'kafkajs';
import { SwipeService } from '../swipe.service';

@Injectable()
export class KafkaConsumerService implements OnModuleInit, OnModuleDestroy {
  private kafka: Kafka;
  private consumer: Consumer;
  private admin: Admin;
  private producer: Producer;

  constructor(private readonly swipeService: SwipeService) {
    this.kafka = new Kafka({
      clientId: 'swipes-service',
      brokers: [process.env.KAFKA_BROKERS || 'kafka:9092'],
    });

    this.consumer = this.kafka.consumer({ groupId: 'swipes-consumer-group' });
    this.producer = this.kafka.producer();
    this.admin = this.kafka.admin();
  }

  async createTopic(topicName: string, numPartitions: number): Promise<void> {
    try {
      const topics = [
        {
          topic: topicName,
          numPartitions,
        },
      ];

      const result = await this.admin.createTopics({
        waitForLeaders: true,
        topics,
      });

      if (result) {
        console.log(`Topic '${topicName}' created successfully`);
      }
    } catch (error) {
      console.error(`Error creating topic '${topicName}':`, error.message);
      throw error;
    }
  }

  async onModuleInit() {
    await this.consumer.connect();
    await this.producer.connect();
    await this.consumer.subscribe({ topic: 'swipes', fromBeginning: true });

    const topicName = 'swipes-dlq';

    if (!(await this.topicExists(topicName))) {
      await this.createTopic(topicName, 3);
    } else {
      console.log(`Topic '${topicName}' already exists`);
    }

    await this.consumer.run({
      eachMessage: async (payload: EachMessagePayload) => {
        const { message } = payload;
        try {
          const swipeEvent = JSON.parse(message.value.toString());
          await this.swipeService.createSwipe(swipeEvent);
        } catch (err) {
          console.error('Error processing swipe event:', err.message);

          await this.sendToDLQ(message);
        }
      },
    });
  }

  async onModuleDestroy() {
    await this.consumer.disconnect();
    await this.producer.disconnect();
  }
  private async sendToDLQ(message: any) {
    const dlqTopic = 'swipes-dlq';

    try {
      // Send the failed message to the DLQ topic
      await this.producer.send({
        topic: dlqTopic,
        messages: [
          {
            value: message.value.toString(),
            headers: {
              originalTopic: 'swipes',
              timestamp: new Date().toISOString(),
            },
          },
        ],
      });

      console.log('Message sent to DLQ:', message.value.toString());
    } catch (dlqError) {
      console.error('Error sending message to DLQ:', dlqError.message);
    }
  }

  async topicExists(topicName: string): Promise<boolean> {
    try {
      const topics = await this.admin.listTopics();
      return topics.includes(topicName);
    } catch (error) {
      console.error('Error checking topic existence:', error.message);
      throw error;
    }
  }
}
