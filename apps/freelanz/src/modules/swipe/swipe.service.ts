import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateSwipeDTO } from '@libs/dto/swipes/create-swipe.dto';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class SwipeService implements OnModuleInit {
  constructor(
    @Inject('SWIPE_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('swipes');
    await this.kafkaClient.connect();
  }

  async createSwipe(swipeDto: CreateSwipeDTO) {
    try {
      this.kafkaClient.emit('swipes', swipeDto);
    } catch (error) {
      console.error('Error publishing swipe event:', error);
      throw new Error('Failed to publish swipe event');
    }
  }
}
