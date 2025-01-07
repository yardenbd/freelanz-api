import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';
const url = process.env.SWIPE_CLIENT_URL || 'localhost:9092';

export const SWIPE_CONFIG: ClientProviderOptions = {
  name: 'SWIPE_SERVICE',
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: [url],
    },
    consumer: {
      groupId: 'api-gateway-group',
    },
    producer: {
      createPartitioner: Partitioners.LegacyPartitioner,
    },
  },
};
