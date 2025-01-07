import { Module } from '@nestjs/common';
import { KafkaConsumerService } from './kafka-consumer.service';
import { SwipeService } from '../swipe.service';

@Module({
  providers: [KafkaConsumerService, SwipeService],
  exports: [KafkaConsumerService],
})
export class KafkaModule {}
