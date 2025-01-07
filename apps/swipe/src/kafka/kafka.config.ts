import { KafkaConfig } from 'kafkajs';

export const kafkaConfig: KafkaConfig = {
  clientId: 'api-gateway',
  brokers: [process.env.KAFKA_BROKERS || 'localhost:9092'],
};
