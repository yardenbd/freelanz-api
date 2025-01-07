import { Controller } from '@nestjs/common';
import { SwipeService } from './swipe.service';
import {
  EventPattern,
  MessagePattern,
  Payload,
  RpcException,
} from '@nestjs/microservices';
import { CreateSwipeDTO } from '../../../libs/dto/swipes/create-swipe.dto';
import { status } from '@grpc/grpc-js';

@Controller()
export class SwipeController {
  constructor(private readonly swipeService: SwipeService) {}

  @EventPattern('swipes')
  async handleSwipeEvent(@Payload() data: CreateSwipeDTO) {
    try {
      await this.swipeService.createSwipe(data);
    } catch (err) {
      console.error('Error processing swipe event:', err.message);
      await this.swipeService.sendToDLQ(data);
      throw new RpcException({
        code: status.INTERNAL,
        message: `Error processing swipe event`,
      });
    }
  }

  @MessagePattern('get_applications')
  async getApplications(data: any) {
    console.log('getApplications', data);
  }
}
